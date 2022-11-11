package travelRepo.domain.account.dto;

import lombok.Data;

@Data
public class LoginAccountDetailsRes {

    private Long id;

    private String email;

    private String nickname;

    private String profile;
}
