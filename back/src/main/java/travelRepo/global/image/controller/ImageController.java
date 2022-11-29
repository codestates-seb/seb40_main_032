package travelRepo.global.image.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.global.image.dto.ImageUploadReq;
import travelRepo.global.image.dto.ImageUploadRes;
import travelRepo.global.image.service.ImageService;

import javax.validation.Valid;
import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image-files")
public class ImageController {

    @Value("${dir}")
    private String path;

    private final ImageService imageService;

    @GetMapping("{imageName}")
    public ResponseEntity<Resource> fileDetails(@PathVariable String imageName) throws MalformedURLException {

        UrlResource urlResource = new UrlResource("file:" + path + imageName);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(urlResource);
    }

    @PostMapping
    public ResponseEntity<ImageUploadRes> imageUpload(@Valid @ModelAttribute ImageUploadReq imageUploadReq) {

        List<String> imagePaths = imageService.uploadImage(imageUploadReq.getImages(), path);

        return new ResponseEntity<>(ImageUploadRes.of(imagePaths), HttpStatus.OK);
    }
}
