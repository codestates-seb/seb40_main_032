package travelRepo.global.image.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifIFD0Directory;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.image.CustomMultipartFile;
import travelRepo.global.image.repository.ImageRepository;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public String uploadImage(MultipartFile image, String path) {

        validationImage(image);

        Metadata metadata;
        Directory directory;
        int orientation = 1;

        try {
            metadata = ImageMetadataReader.readMetadata(image.getInputStream());
            directory = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);

            if (directory != null) {
                orientation = directory.getInt(ExifIFD0Directory.TAG_ORIENTATION);
            }

        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.UPLOAD_FAILED);
        }

        String filename = orientation + createFilename(image);

        try {
            return imageRepository.save(image, filename, path);
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

        String filename = imageAddress.substring(imageAddress.lastIndexOf("/") + 1);

        int orientation = 1;

        String imageId = filename.substring(0, filename.lastIndexOf("."));
        if (imageId.length() > 36) {
            orientation = imageId.charAt(0) - '0';
        }

        try {
            BufferedImage image = imageRepository.download(filename, path);

            image = rotateImage(image, orientation);

            if (image.getWidth() <= 510 && image.getHeight() <= 376) {
                return imageAddress;
            }

            BufferedImage thumbnail = Thumbnails.of(image).size(510, 376).asBufferedImage();

            return uploadImage(convertBufferedImageToMultipartFile(thumbnail, filename), path);

        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.UPLOAD_FAILED);
        }
    }

    private MultipartFile convertBufferedImageToMultipartFile(BufferedImage image, String filename) throws IOException {

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        String contentType = filename.substring(filename.lastIndexOf(".") + 1);

        ImageIO.write(image, contentType, out);

        byte[] bytes = out.toByteArray();

        return new CustomMultipartFile(bytes, "image", filename, contentType, bytes.length);
    }

    private String createFilename(MultipartFile image) {

        int pos = image.getOriginalFilename().lastIndexOf(".");
        return UUID.randomUUID() + image.getOriginalFilename().substring(pos);
    }

    private BufferedImage rotateImage(BufferedImage image, int orientation) {

        int width = image.getWidth();
        int height = image.getHeight();
        int type = image.getType();

        BufferedImage newImage;
        if (orientation == 6|| orientation == 8) {
            newImage = new BufferedImage(height, width, type);
        } else if (orientation == 3) {
            newImage = new BufferedImage(width, height, type);
        } else {
            return image;
        }

        Graphics2D graphics = (Graphics2D) newImage.getGraphics();

        switch (orientation) {
            case 3:
                graphics.rotate(Math.toRadians(180), width / 2, height / 2);
                break;
            case 6:
                graphics.rotate(Math.toRadians(90), height / 2, width / 2);
                graphics.translate((height - width) / 2, (width - height) / 2);
                break;
            case 8:
                graphics.rotate(Math.toRadians(270), height / 2, width / 2);
                graphics.translate((height - width) / 2, (width - height) / 2);
                break;
        }
        graphics.drawImage(image, 0, 0, width, height, null);

        return newImage;
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
