package travelRepo.domain.account.dto;

import lombok.Data;
import travelRepo.domain.account.entity.Account;

@Data
public class AccountSummaryRes {

    private Long accountId;

    private String profile;

    private String nickname;

    static public AccountSummaryRes of (Account account) {

        AccountSummaryRes accountSummaryRes = new AccountSummaryRes();
        accountSummaryRes.setAccountId(account.getId());
        accountSummaryRes.setProfile(account.getProfile());
        accountSummaryRes.setNickname(account.getNickname());

        return accountSummaryRes;
    }
}
