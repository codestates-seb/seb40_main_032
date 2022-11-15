package travelRepo.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.domain.account.entity.Account;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private final List<BoardTag> boardTags = new ArrayList<>();

    public void addBoardTag(BoardTag boardTag) {
        this.boardTags.add(boardTag);
        if (boardTag.getBoard() == null) {
            boardTag.addBoard(this);
        }
    }

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST)
    private final List<BoardPhoto> boardPhotos = new ArrayList<>();

    public void addBoardPhoto(BoardPhoto boardPhoto) {
        this.boardPhotos.add(boardPhoto);
        if (boardPhoto.getBoard() == null) {
            boardPhoto.addBoard(this);
        }
    }
}
