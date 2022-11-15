package travelRepo.domain.comment.dto;

import lombok.Data;
import travelRepo.domain.account.dto.AccountSummaryRes;

import java.time.LocalDateTime;

@Data
public class CommentDetailsRes {

    private Long commentId;

    private String content;

    private LocalDateTime createdAt;

    private AccountSummaryRes account;
}
