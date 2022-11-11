package travelRepo.global.upload.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
@ConditionalOnProperty(value = "mod", havingValue = "local")
public class UploadController {

    @Value("${dir}")
    private String dir;

    @GetMapping("/file/{filename}")
    public ResponseEntity<Resource> fileDetails(@PathVariable String filename) throws MalformedURLException {

        UrlResource urlResource = new UrlResource("file:" + dir + filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(urlResource);
    }
}
