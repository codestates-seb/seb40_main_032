package travelRepo.domain.account.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.entity.Role;

import javax.validation.constraints.Email;

@Data
public class AccountAddReq {

    @Email
    private String email;

    @Length(min = 8, max = 30)
    private String password;

    @Length(min = 2, max = 20)
    private String nickname;

    private MultipartFile profile;

    public Account toAccount(String encodePassword, String profile) {

        return Account.builder()
                .email(this.email)
                .password(encodePassword)
                .nickname(this.nickname)
                .profile(profile)
                .role(Role.USER)
                .build();
    }
}
