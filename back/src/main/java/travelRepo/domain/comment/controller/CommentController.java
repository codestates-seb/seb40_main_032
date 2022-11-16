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
import travelRepo.domain.comment.service.CommentService;
import travelRepo.global.argumentresolver.LoginAccountId;
import travelRepo.global.common.dto.SliceDto;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void commentAdd(@Valid @RequestBody CommentAddReq commentAddReq,
                           @LoginAccountId Long loginAccountId) {

        commentService.addComment(commentAddReq, loginAccountId);
    }

    @PatchMapping("/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public void commentModify(@Valid @RequestBody CommentModifyReq commentModifyReq,
                              @PathVariable Long commentId,
                              @LoginAccountId Long loginAccountId) {

        commentService.modifyComment(commentModifyReq, commentId, loginAccountId);
    }

    @DeleteMapping("{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public void commentRemove(@PathVariable Long commentId) {
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<SliceDto<CommentDetailsRes>> commentList(@PathVariable Long boardId,
                                                                   @PageableDefault(size = 5, sort = "createdAt") Pageable pageable) {

        SliceDto<CommentDetailsRes> response = commentService.commentList(boardId, pageable);

        return new ResponseEntity(response, HttpStatus.OK);
    }
}
