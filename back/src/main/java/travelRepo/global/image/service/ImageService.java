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

    public String uploadImage(MultipartFile image, String path) {

        validationImage(image);

        try {
            return imageRepository.save(image, path);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.UPLOAD_FAILED);
        }
    }

    public List<String> uploadImage(List<MultipartFile> images, String path) {

        return images.stream()
                .map(image -> uploadImage(image, path))
                .collect(Collectors.toList());
    }

    public void validationImage(MultipartFile image) {

        if (image == null || image.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.EMPTY_FILE);
        }

        String imageName = image.getOriginalFilename();

        if (imageName == null) {
            throw new BusinessLogicException(ExceptionCode.ILLEGAL_FILENAME);
        }

        boolean matches = imageName.matches("^\\S.*\\.(jpg|JPG|jpeg|JPEG|png|PNG)$");
        if (!matches) {
            throw new BusinessLogicException(ExceptionCode.ILLEGAL_FILENAME);
        }
    }
}