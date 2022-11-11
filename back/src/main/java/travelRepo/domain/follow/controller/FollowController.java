package travelRepo.domain.follow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.follow.dto.FollowCheckRes;
import travelRepo.domain.follow.dto.FollowPostRes;
import travelRepo.global.common.enums.Status;

@RestController
@RequestMapping("/follows")
@RequiredArgsConstructor
public class FollowController {

    @PostMapping("/{accountId}")
    public ResponseEntity<FollowPostRes> followPost(@PathVariable Long accountId) {

        FollowPostRes followPostRes = new FollowPostRes();
        followPostRes.setStatus(Status.SUCCESS);

        return new ResponseEntity<>(followPostRes, HttpStatus.OK);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<FollowCheckRes> followCheck(@PathVariable Long accountId) {

        FollowCheckRes followCheckRes = new FollowCheckRes();
        followCheckRes.setFollow(true);

        return new ResponseEntity<>(followCheckRes, HttpStatus.OK);
    }
}
