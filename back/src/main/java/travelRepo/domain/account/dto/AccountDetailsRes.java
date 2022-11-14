package travelRepo.domain.account.dto;

import lombok.Data;
import travelRepo.domain.account.entity.Account;

@Data
public class AccountDetailsRes {

    private Long id;

    private String email;

    private String nickname;

    private String intro;

    private String profile;

    private int following;

    private int follower;

    public static AccountDetailsRes of(Account account, int following, int follower) {

        AccountDetailsRes accountDetailsRes = new AccountDetailsRes();

        accountDetailsRes.setId(account.getId());
        accountDetailsRes.setEmail(account.getEmail());
        accountDetailsRes.setNickname(account.getNickname());
        accountDetailsRes.setIntro(account.getIntro());
        accountDetailsRes.setProfile(account.getProfile());
        accountDetailsRes.setFollowing(following);
        accountDetailsRes.setFollower(follower);

        return accountDetailsRes;
    }
}
