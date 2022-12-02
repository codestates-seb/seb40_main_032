package travelRepo.domain.account.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.entity.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AccountAddReq {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Length(min = 8, max = 30)
    private String password;

    @NotBlank
    @Length(min = 2, max = 20)
    private String nickname;

    @NotNull
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
