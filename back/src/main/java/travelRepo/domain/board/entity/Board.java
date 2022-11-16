package travelRepo.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.domain.account.entity.Account;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private List<BoardTag> boardTags;

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST)
    private List<BoardPhoto> boardPhotos;

    public void addAccount(Account account) {
        this.account = account;
        if (!account.getBoards().contains(this)) {
            account.getBoards().add(this);
        }
    }

    public void addBoardTags(List<BoardTag> boardTags) {
        this.boardTags = boardTags;
        for (BoardTag boardTag : boardTags) {
            boardTag.addBoard(this);
        }
    }

    public void addBoardPhotos(List<BoardPhoto> boardPhotos) {
        this.boardPhotos = boardPhotos;
        for (BoardPhoto boardPhoto : boardPhotos) {
            boardPhoto.addBoard(this);
        }
    }

    public void increaseViews() {
        this.views++;
    }

    public void modify(Board board) {
        Optional.ofNullable(board.getTitle()).ifPresent(title -> this.title = title);
        Optional.ofNullable(board.getContent()).ifPresent(content -> this.content = content);
        Optional.ofNullable(board.getLocation()).ifPresent(location -> this.location = location);
        Optional.ofNullable(board.getCategory()).ifPresent(category -> this.category = category);
    }
}
