package travelRepo.global.image.repository;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface ImageRepository {

    String save(MultipartFile image, String path) throws IOException;

    File download(String fileName, String path) throws IOException;
}
