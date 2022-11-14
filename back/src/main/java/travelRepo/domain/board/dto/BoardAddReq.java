package travelRepo.domain.board.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.board.entity.Category;

import java.util.List;

@Data
public class BoardAddReq {

    private String title;

    private String content;

    private String location;

    private Category category;

    private List<String> tags;

    private List<MultipartFile> images;
}
