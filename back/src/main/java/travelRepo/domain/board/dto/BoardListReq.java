package travelRepo.domain.board.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import travelRepo.domain.board.entity.Category;

import java.time.LocalDateTime;

@Data
public class BoardListReq {

    private String query = "";

    private Category category;

    private Long lastBoardId;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime lastBoardCreatedAt;

    private Integer lastBoardViews;

    private Integer lastBoardLikeCount;
}
