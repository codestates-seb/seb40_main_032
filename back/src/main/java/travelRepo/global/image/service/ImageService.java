package travelRepo.global.image.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.image.repository.ImageRepository;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public String upload(MultipartFile image, String path) {

        try {
            if (image == null || image.isEmpty()) {
                return null;
            }
            return imageRepository.save(image, path);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.UPLOAD_FAILED);
        }
    }

    public List<String> upload(List<MultipartFile> images, String path) {

        return images.stream()
                .map(image -> upload(image, path))
                .collect(Collectors.toList());
    }
}