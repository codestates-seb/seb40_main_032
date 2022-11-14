package travelRepo.domain.account.dto;

import lombok.Data;

@Data
public class AccountSummaryRes {

    private Long accountId;

    private String profile;

    private String nickname;
}
