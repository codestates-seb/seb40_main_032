package travelRepo.domain.board.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Data;
import travelRepo.domain.account.dto.AccountSummaryRes;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.BoardPhoto;
import travelRepo.domain.board.entity.BoardTag;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class BoardDetailsRes {

    private Long boardId;

    private String title;

    private String content;

    private String location;

    private String category;

    private int likeCount;

    private int views;

    private List<String> tags;

    private List<String> photos;

    @JsonSerialize(using= LocalDateTimeSerializer.class)
    @JsonDeserialize(using= LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;

    private AccountSummaryRes account;

    static public BoardDetailsRes of(Board board) {

        BoardDetailsRes boardDetailsRes = new BoardDetailsRes();
        boardDetailsRes.setBoardId(board.getId());
        boardDetailsRes.setTitle(board.getTitle());
        boardDetailsRes.setContent(board.getContent());
        boardDetailsRes.setLocation(board.getLocation());
        boardDetailsRes.setCategory(board.getCategory().getName());
        boardDetailsRes.setLikeCount(board.getLikeCount());
        boardDetailsRes.setViews(board.getViews() + 1);
        boardDetailsRes.setTags(
                board.getBoardTags().stream()
                        .sorted(Comparator.comparing(BoardTag::getOrders))
                        .map(boardTag -> boardTag.getTag().getName())
                        .collect(Collectors.toList())
        );
        boardDetailsRes.setPhotos(
                board.getBoardPhotos().stream()
                        .sorted(Comparator.comparing(BoardPhoto::getOrders))
                        .map(BoardPhoto::getPhoto)
                        .collect(Collectors.toList())
        );
        boardDetailsRes.setCreatedAt(board.getCreatedAt().withNano(0));
        boardDetailsRes.setAccount(AccountSummaryRes.of(board.getAccount()));

        return boardDetailsRes;
    }
}
