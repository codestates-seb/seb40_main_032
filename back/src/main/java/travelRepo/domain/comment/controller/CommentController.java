package travelRepo.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.AccountSummaryRes;
import travelRepo.domain.comment.dto.CommentAddReq;
import travelRepo.domain.comment.dto.CommentDetailsRes;
import travelRepo.domain.comment.dto.CommentModifyReq;
import travelRepo.global.common.dto.SliceDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void commentAdd(@RequestBody CommentAddReq commentAddReq) {
    }

    @PatchMapping("/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public void commentModify(@RequestBody CommentModifyReq commentModifyReq,
                              @PathVariable Long commentId) {
    }

    @DeleteMapping("{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public void commentRemove(@PathVariable Long commentId) {
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<SliceDto<CommentDetailsRes>> commentList(@PathVariable Long boardId,
                                                                  @PageableDefault(size = 5) Pageable pageable) {

        List<CommentDetailsRes> content = new ArrayList<>();

        for (int i = 1; i < 6; i++) {
            AccountSummaryRes accountSummaryRes = new AccountSummaryRes();
            accountSummaryRes.setAccountId(0L + i);
            accountSummaryRes.setProfile("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/" + i + ".png");
            accountSummaryRes.setNickname("mockAccount" + i);

            CommentDetailsRes commentDetailsRes = new CommentDetailsRes();
            commentDetailsRes.setCommentId(0L + i);
            commentDetailsRes.setContent("mock comment content" + i);
            commentDetailsRes.setCreatedAt(LocalDateTime.now());
            commentDetailsRes.setAccountSummaryRes(accountSummaryRes);

            content.add(commentDetailsRes);
        }

        SliceImpl<CommentDetailsRes> response = new SliceImpl(content, pageable, true);

        return new ResponseEntity(new SliceDto(response), HttpStatus.OK);
    }
}
