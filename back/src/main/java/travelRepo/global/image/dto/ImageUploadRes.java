package travelRepo.global.image.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ImageUploadRes {

    List<String> imagePaths = new ArrayList<>();
}
