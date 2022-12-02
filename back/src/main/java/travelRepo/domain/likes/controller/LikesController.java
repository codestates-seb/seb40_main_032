package travelRepo.domain.likes.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.likes.dto.LikesCheckRes;
import travelRepo.domain.likes.dto.LikesPostRes;
import travelRepo.domain.likes.service.LikesService;
import travelRepo.global.argumentresolver.LoginAccountId;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;

    @PostMapping("/{boardId}")
    public ResponseEntity<LikesPostRes> LikesPost(@LoginAccountId Long loginAccountId, @PathVariable Long boardId) {

        LikesPostRes likesPostRes = likesService.postLikes(loginAccountId, boardId);

        return new ResponseEntity<>(likesPostRes, HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<LikesCheckRes> LikesCheck(@LoginAccountId Long loginAccountId, @PathVariable Long boardId) {

        LikesCheckRes likesCheckRes = likesService.checkLikes(loginAccountId, boardId);

        return new ResponseEntity<>(likesCheckRes, HttpStatus.OK);
    }
}
