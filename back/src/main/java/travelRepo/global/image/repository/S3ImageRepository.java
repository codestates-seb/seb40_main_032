package travelRepo.global.image.repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Repository
@ConditionalOnProperty(value = "mod", havingValue = "server")
@RequiredArgsConstructor
public class S3ImageRepository implements ImageRepository{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${tempRepo}")
    private String tempRepo;

    private final AmazonS3 amazonS3;

    @Override
    public String save(MultipartFile image, String path) throws IOException {

        String s3Filename = path + createS3Filename(image);

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentType(image.getContentType());
        objMeta.setContentLength(image.getInputStream().available());

        amazonS3.putObject(bucket, s3Filename, image.getInputStream(), objMeta);

        return amazonS3.getUrl(bucket, s3Filename).toString();
    }

    @Override
    public File download(String fileName, String path) throws IOException {

        String fullFileName = path + fileName;

        S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, fullFileName));
        S3ObjectInputStream objectInputStream = o.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        File file = new File(tempRepo + fileName);
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        fileOutputStream.write(bytes);

        return file;
    }

    private String createS3Filename(MultipartFile image) {

        int pos = image.getOriginalFilename().lastIndexOf(".");
        return UUID.randomUUID() + image.getOriginalFilename().substring(pos);
    }
}
