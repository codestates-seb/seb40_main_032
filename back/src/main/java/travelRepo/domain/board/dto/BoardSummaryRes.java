package travelRepo.domain.board.dto;

import lombok.Data;

import java.util.List;

@Data
public class BoardSummaryRes {

    private Long boardId;

    private String thumbnail;

    private String title;

    private int likeCount;

    private List<String> tags;

    private Long accountId;

    private String accountProfile;

    private String accountNickname;
}
