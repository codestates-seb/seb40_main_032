package travelRepo.domain.account.entity;

import lombok.*;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;

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

}
