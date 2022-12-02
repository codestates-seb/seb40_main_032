package travelRepo.global.image.repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Repository
@ConditionalOnProperty(value = "mod", havingValue = "server")
@RequiredArgsConstructor
public class S3ImageRepository implements ImageRepository{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    @Override
    public String save(MultipartFile image, String filename, String path) throws IOException {

        String s3Filename = path + filename;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentType(image.getContentType());
        objMeta.setContentLength(image.getInputStream().available());

        amazonS3.putObject(bucket, s3Filename, image.getInputStream(), objMeta);

        return amazonS3.getUrl(bucket, s3Filename).toString();
    }

    @Override
    public BufferedImage download(String fileName, String path) throws IOException {

        String fullFileName = path + fileName;

        S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, fullFileName));

        return ImageIO.read(o.getObjectContent());

    }
}
