package travelRepo.domain.comment.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CommentModifyReq {

    @NotBlank
    private String content;
}
