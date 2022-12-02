package travelRepo.domain.account.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.domain.board.entity.Board;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    private String tempPassword;

    private LocalDateTime tempPasswordAppliedAt;

    private LocalDateTime tempPasswordEmailSendAt;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "account")
    private List<Board> boards = new ArrayList<>();

    public void modify(Account account) {

        Optional.ofNullable(account.getPassword()).ifPresent(password -> this.password = password);
        Optional.ofNullable(account.getNickname()).ifPresent(nickname -> this.nickname = nickname);
        Optional.ofNullable(account.getProfile()).ifPresent(profile -> this.profile = profile);
        Optional.ofNullable(account.getIntro()).ifPresent(intro -> this.intro = intro);
    }

    public void createTempPassword() {

        String uuid = UUID.randomUUID().toString().substring(0, 15);
        this.tempPassword = uuid.replaceAll("[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]", "");
    }

    public void setTempPasswordEmailSendAt() {
        this.tempPasswordEmailSendAt = LocalDateTime.now();
    }

    public boolean verifyTempPassword(String tempPassword) {
        return this.tempPassword.equals(tempPassword);
    }

    public void applyTempPassword(String tempPassword) {

        this.password = tempPassword;
        this.tempPasswordAppliedAt = LocalDateTime.now();
        this.tempPassword = null;
    }

    public boolean canApplyTempPassword() {

        if (this.tempPasswordAppliedAt == null) {
            return true;
        }

        return this.tempPasswordAppliedAt.isBefore(LocalDateTime.now().minusHours(1));
    }

    public boolean canSendTempPasswordGuide() {

        if (this.tempPasswordEmailSendAt == null) {
            return true;
        }

        return this.tempPasswordEmailSendAt.isBefore(LocalDateTime.now().minusHours(1));
    }

}
