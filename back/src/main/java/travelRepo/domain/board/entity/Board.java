package travelRepo.domain.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.domain.account.entity.Account;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Board extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "board_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    private String title;

    private String content;

    private String location;

    private int likeCount;

    private int views;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST)
    private List<BoardPhoto> boardPhotos = new ArrayList<>();

    public void addAccount(Account account) {
        this.account = account;
        if (!account.getBoards().contains(this)) {
            account.getBoards().add(this);
        }
    }
}
