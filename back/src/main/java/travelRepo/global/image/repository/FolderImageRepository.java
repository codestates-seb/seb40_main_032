package travelRepo.global.image.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Repository
@ConditionalOnProperty(value = "mod", havingValue = "local")
public class FolderImageRepository implements ImageRepository {

    @Value("${tempRepo}")
    private String tempRepo;

    @Override
    public String save(MultipartFile image, String path) throws IOException {

        String localFilename = createLocalFilename(image);
        String fullPath = path + localFilename;

        image.transferTo(new File(fullPath));

        return "http://localhost:8080/image-files/" + localFilename;
    }

    @Override
    public File download(String fileName, String path) throws IOException {

        File file = new File(path + fileName);

        File tempFile = new File(tempRepo + fileName);

        Files.copy(file.toPath(), tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

        return tempFile;
    }

    private String createLocalFilename(MultipartFile image) {

        int pos = image.getOriginalFilename().lastIndexOf(".");
        return UUID.randomUUID() + image.getOriginalFilename().substring(pos);
    }
}

