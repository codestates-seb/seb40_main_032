package travelRepo.domain.board.dto;

import lombok.Data;
import travelRepo.domain.account.dto.AccountSummaryRes;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.BoardTag;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class BoardSummaryResWithLikeId {

    private Long boardId;


    private String thumbnail;

    private String title;

    private int likeCount;

    private int commentCount;

    private List<String> tags;

    private Long likeId;

    private LocalDateTime likeCreatedAt;

    private AccountSummaryRes account;

    static public BoardSummaryResWithLikeId of(Board board) {

        BoardSummaryResWithLikeId boardSummaryRes = new BoardSummaryResWithLikeId();
        boardSummaryRes.setBoardId(board.getId());
        boardSummaryRes.setThumbnail(board.getThumbnail());
        boardSummaryRes.setTitle(board.getTitle());
        boardSummaryRes.setLikeCount(board.getLikeCount());
        boardSummaryRes.setCommentCount(board.getComments().size());
        boardSummaryRes.setTags(
                board.getBoardTags().stream()
                        .sorted(Comparator.comparing(BoardTag::getOrders))
                        .map(boardTag -> boardTag.getTag().getName())
                        .collect(Collectors.toList())
        );
        boardSummaryRes.setAccount(AccountSummaryRes.of(board.getAccount()));

        return boardSummaryRes;
    }
}
