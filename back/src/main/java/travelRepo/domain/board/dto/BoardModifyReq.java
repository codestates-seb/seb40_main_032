package travelRepo.domain.board.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.Category;

import java.util.List;

@Data
public class BoardModifyReq {

    @Length(min = 5, max = 40)
    private String title;

    @Length(min = 5, max = 2000)
    private String content;

    private String location;

    private Category category;

    private List<String> tags;

    private List<String> images;

    public Board toBoard() {

        Board.BoardBuilder builder = Board.builder()
                .title(title)
                .content(content)
                .location(location)
                .category(category);

        if (images != null) {
            builder.thumbnail(images.get(0));
        }

        return builder.build();
    }
}
