package travelRepo.global.image.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ImageUploadRes {

    List<String> imagePaths = new ArrayList<>();

    public static ImageUploadRes of(List<String> imagePaths) {

        ImageUploadRes imageUploadRes = new ImageUploadRes();
        imageUploadRes.setImagePaths(imagePaths);

        return imageUploadRes;
    }
}
