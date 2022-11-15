package travelRepo.domain.board.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.Category;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class BoardAddReq {

    @Length(min = 5, max = 40)
    private String title;

    @Length(min = 5)
    private String content;

    private String location;

    @NotNull
    private Category category;

    private List<String> tags;

    @NotNull
    private List<MultipartFile> images;

    public Board toBoard(Account account) {
        return Board.builder()
                .account(account)
                .title(title)
                .content(content)
                .location(location)
                .category(category)
                .build();
    }
}
