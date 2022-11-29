package travelRepo.global.image.service;

import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.image.CustomMultipartFile;
import travelRepo.global.image.repository.ImageRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {

    @Value("${tempRepo}")
    private String tempRepo;

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

    public String getThumbnail(String imageAddress, String path) {

        String fileName = imageAddress.substring(imageAddress.lastIndexOf("/") + 1);

        try {
            File file = imageRepository.download(fileName, path);

            BufferedImage image = ImageIO.read(file);

            if (image.getWidth() < 510 && image.getHeight() < 376) {
                return imageAddress;
            }

            File thumbnail = new File(tempRepo + "S_" + fileName);

            Thumbnails.of(image).size(510, 376).toFile(thumbnail);

            String address = uploadImage(convertBufferedImageToMultipartFile(ImageIO.read(thumbnail), fileName), path);

            file.delete();
            thumbnail.delete();

            return address;

        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.UPLOAD_FAILED);
        }
    }

    private MultipartFile convertBufferedImageToMultipartFile(BufferedImage image, String fileName) throws IOException {

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        String contentType = fileName.substring(fileName.lastIndexOf(".") + 1);

        ImageIO.write(image, contentType, out);

        byte[] bytes = out.toByteArray();

        return new CustomMultipartFile(bytes, "image", fileName, contentType, bytes.length);
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
