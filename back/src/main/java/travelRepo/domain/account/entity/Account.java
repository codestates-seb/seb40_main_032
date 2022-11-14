package travelRepo.domain.account.entity;

import lombok.*;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "account_id")
    private Long id;

    private String email;

    private String password;

    private String nickname;

    private String profile;

    private String intro;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void modify(Account account) {

        Optional.ofNullable(account.getPassword()).ifPresent(password -> this.password = password);
        Optional.ofNullable(account.getNickname()).ifPresent(nickname -> this.nickname = nickname);
        Optional.ofNullable(account.getProfile()).ifPresent(profile -> this.profile = profile);
        Optional.ofNullable(account.getIntro()).ifPresent(intro -> this.intro = intro);
    }
}
