package travelRepo.global.image.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class ImageUploadReq {

    @NotEmpty
    List<MultipartFile> images;
}
