package travelRepo.domain.account.dto;

import lombok.Data;

@Data
public class AccountDetailsRes {

    private Long id;

    private String email;

    private String nickname;

    private String profile;

    private boolean follow = false;

    private int following;

    private int follower;
}
