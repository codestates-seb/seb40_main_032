package travelRepo.global.image.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ImageUploadReq {

    List<MultipartFile> images;
}
