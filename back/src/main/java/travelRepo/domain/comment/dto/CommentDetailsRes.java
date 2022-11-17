package travelRepo.domain.comment.dto;

import lombok.Data;
import travelRepo.domain.account.dto.AccountSummaryRes;
import travelRepo.domain.comment.entity.Comment;

import java.time.LocalDateTime;

@Data
public class CommentDetailsRes {

    private Long commentId;

    private String content;

    private LocalDateTime createdAt;

    private AccountSummaryRes account;

    public static CommentDetailsRes of(Comment comment) {

        CommentDetailsRes commentDetailsRes = new CommentDetailsRes();
        commentDetailsRes.setCommentId(comment.getId());
        commentDetailsRes.setContent(comment.getContent());
        commentDetailsRes.setCreatedAt(comment.getCreatedAt());
        commentDetailsRes.setAccount(AccountSummaryRes.of(comment.getAccount()));

        return commentDetailsRes;
    }
}
