package travelRepo.domain.account.entity;

import travelRepo.global.auditing.BaseTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
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

    public Account(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
