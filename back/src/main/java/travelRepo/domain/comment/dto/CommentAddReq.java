package travelRepo.domain.comment.dto;

import lombok.Data;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.comment.entity.Comment;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class CommentAddReq {

    @NotNull
    @Positive
    private Long boardId;

    @NotBlank
    private String content;

    public Comment toComment(Account account, Board board) {

        return Comment.builder()
                .account(account)
                .board(board)
                .content(content)
                .build();
    }
}
