package travelRepo.global.upload.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadService {

    public String upload(MultipartFile image) throws IOException;
}