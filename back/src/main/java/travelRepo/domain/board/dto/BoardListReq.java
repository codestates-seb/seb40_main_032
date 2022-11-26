package travelRepo.domain.board.dto;

import lombok.Data;
import travelRepo.domain.board.entity.Category;

@Data
public class BoardListReq {

    private String query = "";

    private Category category;

    private Long lastBoardId;

    private Integer lastBoardViews;

    private Integer lastBoardLikeCount;
}
