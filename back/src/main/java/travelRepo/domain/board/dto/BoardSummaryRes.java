package travelRepo.domain.board.dto;

import lombok.Data;
import travelRepo.domain.account.dto.AccountSummaryRes;

import java.util.List;

@Data
public class BoardSummaryRes {

    private Long boardId;

    private String thumbnail;

    private String title;

    private int likeCount;

    private List<String> tags;

    private AccountSummaryRes account;
}
