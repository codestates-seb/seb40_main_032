package travelRepo.domain.account.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import travelRepo.domain.account.entity.Account;

@Data
public class AccountModifyReq {

    @Length(min = 8, max = 30)
    private String password;

    @Length(min = 2, max = 20)
    private String nickname;

    private String intro;

    private String profile;

    public Account toAccount(String password) {
        return Account.builder()
                .password(password)
                .nickname(this.nickname)
                .intro(this.intro)
                .profile(this.profile)
                .build();
    }
}
