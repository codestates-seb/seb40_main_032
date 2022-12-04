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
public class BoardSummaryRes {

    private Long boardId;

    private String thumbnail;

    private String title;

    private int likeCount;

    private int views;

    private int commentCount;

    private LocalDateTime createdAt;

    private List<String> tags;

    private AccountSummaryRes account;

    static public BoardSummaryRes of(Board board) {

        BoardSummaryRes boardSummaryRes = new BoardSummaryRes();
        boardSummaryRes.setBoardId(board.getId());
        boardSummaryRes.setThumbnail(board.getThumbnail());
        boardSummaryRes.setTitle(board.getTitle());
        boardSummaryRes.setLikeCount(board.getLikeCount());
        boardSummaryRes.setViews(board.getViews());
        boardSummaryRes.setCommentCount(board.getComments().size());
        boardSummaryRes.setCreatedAt(board.getCreatedAt().withNano(0));
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
