package travelRepo.domain.board.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardTag {

    @Id
    @GeneratedValue
    @Column(name = "boardTag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Setter
    private int orders;

    public void addBoard(Board board) {
        this.board = board;
    }
}
