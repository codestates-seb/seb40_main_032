package travelRepo.global.image.repository;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Repository
@ConditionalOnProperty(value = "mod", havingValue = "local")
public class FolderImageRepository implements ImageRepository {

    @Override
    public String save(MultipartFile image, String path) throws IOException {

        String localFilename = createLocalFilename(image);
        String fullPath = path + localFilename;

        image.transferTo(new File(fullPath));

        return "http://localhost:8080/image-files/" + localFilename;
    }

    private String createLocalFilename(MultipartFile image) {

        int pos = image.getOriginalFilename().lastIndexOf(".");
        return UUID.randomUUID().toString() + image.getOriginalFilename().substring(pos);
    }

}

