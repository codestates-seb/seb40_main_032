package travelRepo.domain.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.board.entity.Board;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    private String content;

    public Comment(Account account, Board board, String content) {
        this.account = account;
        this.board = board;
        this.content = content;
        board.getComments().add(this);
    }

    public void modify(String content) {
        this.content = content;
    }
}
