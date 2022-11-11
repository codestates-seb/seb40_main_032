package travelRepo.global.upload.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@ConditionalOnProperty(value = "mod", havingValue = "local")
public class LocalUploadService implements UploadService{

    @Value("${dir}")
    private String dir;

    @Override
    public String upload(MultipartFile image) throws IOException {

        String localFilename = createLocalFilename(image);
        String path = dir + localFilename;

        image.transferTo(new File(path));

        return "http://localhost:8080/file/" + localFilename;
    }

    private String createLocalFilename(MultipartFile image) {

        int pos = image.getOriginalFilename().lastIndexOf(".");
        return UUID.randomUUID().toString() + image.getOriginalFilename().substring(pos);
    }
}
