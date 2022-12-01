package travelRepo.global.image.repository;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Repository
@ConditionalOnProperty(value = "mod", havingValue = "local")
public class FolderImageRepository implements ImageRepository {

    @Override
    public String save(MultipartFile image, String filename, String path) throws IOException {

        String fullPath = path + filename;

        image.transferTo(new File(fullPath));

        return "http://localhost:8080/image-files/" + filename;
    }

    @Override
    public BufferedImage download(String fileName, String path) throws IOException {

        File file = new File(path + fileName);

        return ImageIO.read(file);
    }
}

