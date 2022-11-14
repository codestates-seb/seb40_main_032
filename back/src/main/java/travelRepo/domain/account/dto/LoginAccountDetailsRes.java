package travelRepo.domain.account.dto;

import lombok.Data;
import travelRepo.domain.account.entity.Account;

@Data
public class LoginAccountDetailsRes {

    private Long id;

    private String email;

    private String nickname;

    private String profile;

    public static LoginAccountDetailsRes of(Account account) {

        LoginAccountDetailsRes loginAccountDetailsRes = new LoginAccountDetailsRes();

        loginAccountDetailsRes.setId(account.getId());
        loginAccountDetailsRes.setEmail(account.getEmail());
        loginAccountDetailsRes.setNickname(account.getNickname());
        loginAccountDetailsRes.setProfile(account.getProfile());

        return loginAccountDetailsRes;
    }
}
