package travelRepo.domain.likes.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.likes.dto.LikesCheckRes;
import travelRepo.domain.likes.dto.LikesPostRes;
import travelRepo.global.common.enums.Status;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikesController {

    @PostMapping("/{boardId}")
    public ResponseEntity<LikesPostRes> LikesPost(@PathVariable Long boardId) {

        LikesPostRes likesPostRes = new LikesPostRes();
        likesPostRes.setStatus(Status.SUCCESS);

        return new ResponseEntity<>(likesPostRes, HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<LikesCheckRes> LikesCheck(@PathVariable Long boardId) {

        LikesCheckRes likesCheckRes = new LikesCheckRes();
        likesCheckRes.setLikes(true);

        return new ResponseEntity<>(likesCheckRes, HttpStatus.OK);
    }
}
