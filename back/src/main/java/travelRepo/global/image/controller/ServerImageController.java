package travelRepo.global.image.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import travelRepo.global.image.dto.ImageUploadReq;
import travelRepo.global.image.dto.ImageUploadRes;

@RestController
@RequiredArgsConstructor
@ConditionalOnProperty(value = "mod", havingValue = "server")
public class ServerImageController {

    @PostMapping("/files")
    public ResponseEntity<ImageUploadRes> FileUpload(@ModelAttribute ImageUploadReq imageUploadReq) {
        return null;
    }

}
