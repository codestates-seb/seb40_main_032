package travelRepo.domain.board.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.Category;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class BoardAddReq {

    @NotNull
    @Length(min = 5, max = 40)
    private String title;

    @NotNull
    @Length(min = 5, max = 2000)
    private String content;

    private String location;

    private String thumbnail;

    @NotNull
    private Category category;

    private List<String> tags;

    @NotNull
    private List<String> images;

    public Board toBoard(Account account) {

        Board board = Board.builder()
                .title(title)
                .content(content)
                .location(location)
                .thumbnail(thumbnail)
                .category(category)
                .build();

        board.addAccount(account);

        return board;
    }
}
