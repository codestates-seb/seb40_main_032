package travelRepo.domain.account.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.account.entity.Account;

@Data
public class AccountModifyReq {

    @Length(min = 8, max = 30)
    private String password;

    @Length(min = 2, max = 20)
    private String nickname;

    private String intro;

    private MultipartFile profile;

    public Account toAccount(String profile) {

        return Account.builder()
                .password(this.password)
                .nickname(this.nickname)
                .intro(this.intro)
                .profile(profile)
                .build();
    }
}
