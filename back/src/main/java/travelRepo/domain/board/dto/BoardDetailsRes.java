package travelRepo.domain.board.dto;

import lombok.Data;
import travelRepo.domain.board.entity.Category;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardDetailsRes {

    private boolean myBoard;

    private Long boardId;

    private String title;

    private String content;

    private String location;

    private Category category;

    private List<String> tags;

    private List<String> photos;

    private LocalDateTime createdAt;

    private Long accountId;

    private String accountProfile;

    private String accountNickname;
}
