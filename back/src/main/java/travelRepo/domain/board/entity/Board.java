package travelRepo.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.comment.entity.Comment;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;
import java.util.ArrayList;
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

    private String thumbnail;

    private int likeCount;

    private int views;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private final List<BoardTag> boardTags = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private  final List<BoardPhoto> boardPhotos = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private final List<Comment> comments = new ArrayList<>();

    public void addAccount(Account account) {
        this.account = account;
        if (!account.getBoards().contains(this)) {
            account.getBoards().add(this);
        }
    }

    public void addBoardTags(List<BoardTag> boardTags) {
        this.boardTags.clear();
        this.boardTags.addAll(boardTags);
        for (BoardTag boardTag : boardTags) {
            boardTag.addBoard(this);
        }
    }

    public void addBoardPhotos(List<BoardPhoto> boardPhotos) {
        this.boardPhotos.clear();
        this.boardPhotos.addAll(boardPhotos);
        for (BoardPhoto boardPhoto : boardPhotos) {
            boardPhoto.addBoard(this);
        }
    }

    public void modify(Board board) {
        Optional.ofNullable(board.getTitle()).ifPresent(title -> this.title = title);
        Optional.ofNullable(board.getContent()).ifPresent(content -> this.content = content);
        Optional.ofNullable(board.getLocation()).ifPresent(location -> this.location = location);
        Optional.ofNullable(board.getThumbnail()).ifPresent(thumbnail -> this.thumbnail = thumbnail);
        Optional.ofNullable(board.getCategory()).ifPresent(category -> this.category = category);
    }
}
