package travelRepo.domain.follow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.follow.dto.FollowCheckRes;
import travelRepo.domain.follow.dto.FollowPostRes;
import travelRepo.domain.follow.service.FollowService;
import travelRepo.global.argumentresolver.LoginAccountId;

@RestController
@RequestMapping("/follows")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{accountId}")
    public ResponseEntity<FollowPostRes> followPost(@LoginAccountId Long loginAccountId,
                                                    @PathVariable Long accountId) {

        FollowPostRes followPostRes = followService.postFollow(loginAccountId, accountId);

        return new ResponseEntity<>(followPostRes, HttpStatus.OK);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<FollowCheckRes> followCheck(@LoginAccountId Long loginAccountId,
                                                      @PathVariable Long accountId) {

        FollowCheckRes followCheckRes = followService.checkFollow(loginAccountId, accountId);

        return new ResponseEntity<>(followCheckRes, HttpStatus.OK);
    }
}
