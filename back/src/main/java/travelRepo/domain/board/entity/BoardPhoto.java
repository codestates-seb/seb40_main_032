package travelRepo.domain.board.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardPhoto {

    @Id
    @GeneratedValue
    @Column(name = "boardPhoto_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    private String photo;

    @Setter
    private int orders;

    public void addBoard(Board board) {
        this.board = board;
    }
}
