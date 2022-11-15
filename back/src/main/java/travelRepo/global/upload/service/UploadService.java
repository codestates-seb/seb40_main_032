package travelRepo.global.upload.service;

import org.springframework.web.multipart.MultipartFile;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public interface UploadService {

    String uploadWithException(MultipartFile image) throws IOException;

    default String upload(MultipartFile image) {

        try {
            return uploadWithException(image);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.UPLOAD_FAILED);
        }
    }

    default List<String> upload(List<MultipartFile> images) {

        return images.stream()
                .map(this::upload)
                .collect(Collectors.toList());
    }
}