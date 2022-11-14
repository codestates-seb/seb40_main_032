package travelRepo.domain.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import travelRepo.global.auditing.BaseTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Tag extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "tag_id")
    private Long id;

    private String name;
}
