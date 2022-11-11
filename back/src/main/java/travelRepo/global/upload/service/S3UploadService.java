package travelRepo.global.upload.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3UploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String upload(MultipartFile image) throws IOException {

        String s3Filename = createS3Filename(image);

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentType(image.getContentType());
        objMeta.setContentLength(image.getInputStream().available());

        amazonS3.putObject(bucket, s3Filename, image.getInputStream(), objMeta);

        return amazonS3.getUrl(bucket, s3Filename).toString();
    }

    private String createS3Filename(MultipartFile image) {

        int pos = image.getOriginalFilename().lastIndexOf(".");
        return UUID.randomUUID().toString() + image.getOriginalFilename().substring(pos);
    }
}