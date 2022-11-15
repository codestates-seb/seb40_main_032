package travelRepo.domain.comment.dto;

import lombok.Data;

@Data
public class CommentAddReq {

    private Long boardId;

    private String content;
}
