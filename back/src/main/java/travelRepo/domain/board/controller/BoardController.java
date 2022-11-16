package travelRepo.domain.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.AccountSummaryRes;
import travelRepo.domain.board.dto.BoardAddReq;
import travelRepo.domain.board.dto.BoardDetailsRes;
import travelRepo.domain.board.dto.BoardModifyReq;
import travelRepo.domain.board.dto.BoardSummaryRes;
import travelRepo.domain.board.entity.Category;
import travelRepo.domain.board.service.BoardService;
import travelRepo.global.argumentresolver.LoginAccountId;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.SliceDto;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<IdDto> boardAdd(@LoginAccountId Long loginAccountId,
                                          @Valid @ModelAttribute BoardAddReq boardAddReq) {

        IdDto response = boardService.addBoard(loginAccountId, boardAddReq);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PostMapping("/{boardId}")
    public ResponseEntity<IdDto> boardModify(@LoginAccountId Long loginAccountId,
                                             @Valid @ModelAttribute BoardModifyReq boardModifyReq,
                                             @PathVariable Long boardId) {

        IdDto response = boardService.modifyBoard(loginAccountId, boardModifyReq, boardId);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public void boardRemove() {
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDetailsRes> boardDetails(@PathVariable Long boardId) {

        AccountSummaryRes account = new AccountSummaryRes();
        account.setAccountId(1L);
        account.setProfile("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/1.png");
        account.setNickname("mockAccount");

        BoardDetailsRes response = new BoardDetailsRes();
        response.setMyBoard(false);
        response.setBoardId(boardId);
        response.setTitle("mock board title");
        response.setContent("mock board content");
        response.setLocation("mock board location");
        response.setCategory(Category.SPOT);
        response.setLikeCount(16);
        response.setViews(256);
        response.setTags(
                List.of("mock tag1", "mock tag2", "mock tag3")
        );
        response.setPhotos(
                List.of("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/1.png",
                        "https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/2.png",
                        "https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/3.png")
        );
        response.setCreatedAt(LocalDateTime.now());
        response.setAccount(account);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<SliceDto<BoardSummaryRes>> boardList(@RequestParam(required = false) String query,
                                                               @RequestParam(required = false) Category category,
                                                               @PageableDefault(size = 20) Pageable pageable) {

        List<BoardSummaryRes> content = new ArrayList<>();

        for (int i = 1; i < 21; i++) {
            AccountSummaryRes account = new AccountSummaryRes();
            account.setAccountId((3L + i)%4 + 1);
            account.setProfile("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/" + ((3+i)%4 + 1) + ".png");
            account.setNickname("mockAccount" + ((3+i)%4 + 1));

            BoardSummaryRes boardSummaryRes = new BoardSummaryRes();
            boardSummaryRes.setBoardId(0L + i);
            boardSummaryRes.setThumbnail("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/" + i + ".png");
            boardSummaryRes.setTitle("mock board title" + i);
            boardSummaryRes.setLikeCount(10 + i);
            boardSummaryRes.setTags(
                    List.of("mock tag" + i%10, "mock tag" + (i+1)%10, "mock tag" + (i+2)%10)
            );
            boardSummaryRes.setAccount(account);

            content.add(boardSummaryRes);
        }

        SliceImpl<BoardSummaryRes> response = new SliceImpl<>(content, pageable, true);

        return new ResponseEntity(new SliceDto(response), HttpStatus.OK);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<SliceDto<BoardSummaryRes>> accountBoardList(@PathVariable Long accountId,
                                                                      @PageableDefault(size = 20) Pageable pageable) {

        AccountSummaryRes account = new AccountSummaryRes();
        account.setAccountId(1L);
        account.setProfile("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/1.png");
        account.setNickname("mockAccount");

        List<BoardSummaryRes> content = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            BoardSummaryRes boardSummaryRes = new BoardSummaryRes();
            boardSummaryRes.setBoardId(1L + i);
            boardSummaryRes.setTitle("mock board title" + (1 + i));
            boardSummaryRes.setThumbnail("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/%EC%83%88+%ED%8F%B4%EB%8D%94/" + i + ".png");
            boardSummaryRes.setTags(
                    List.of("mock tag" + i, "mock tag" + (i + 1), "mock tag" + (i + 2))
            );
            boardSummaryRes.setAccount(account);

            content.add(boardSummaryRes);
        }

        SliceImpl<BoardSummaryRes> response = new SliceImpl<>(content, pageable, false);

        return new ResponseEntity(new SliceDto(response), HttpStatus.OK);
    }
}
