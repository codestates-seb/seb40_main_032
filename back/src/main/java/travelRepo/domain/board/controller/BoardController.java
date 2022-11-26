package travelRepo.domain.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.board.dto.*;
import travelRepo.domain.board.service.BoardService;
import travelRepo.global.argumentresolver.LoginAccountId;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.SliceDto;

import javax.validation.Valid;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<IdDto> boardAdd(@LoginAccountId Long loginAccountId,
                                          @Valid @RequestBody BoardAddReq boardAddReq) {

        IdDto response = boardService.addBoard(loginAccountId, boardAddReq);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/{boardId}")
    public ResponseEntity<IdDto> boardModify(@LoginAccountId Long loginAccountId,
                                             @Valid @RequestBody BoardModifyReq boardModifyReq,
                                             @PathVariable Long boardId) {

        IdDto response = boardService.modifyBoard(loginAccountId, boardModifyReq, boardId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public void boardRemove(@LoginAccountId Long loginAccountId,
                            @PathVariable Long boardId) {

        boardService.removeBoard(loginAccountId, boardId);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDetailsRes> boardDetails(@PathVariable Long boardId) {

        BoardDetailsRes response = boardService.findBoard(boardId);
        boardService.upViewToRedis(boardId, response);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<SliceDto<BoardSummaryRes>> boardList(@ModelAttribute BoardListReq boardListReq,
                                                               @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        SliceDto<BoardSummaryRes> response = boardService.findBoards(boardListReq, pageable);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<SliceDto<BoardSummaryRes>> accountBoardList(@PathVariable Long accountId,
                                                                      @RequestParam(required = false) Long lastBoardId,
                                                                      @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        SliceDto<BoardSummaryRes> response = boardService.findBoardsByAccount(accountId, lastBoardId, pageable);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/like/account/{accountId}")
    public ResponseEntity<SliceDto<BoardSummaryResWithLikeId>> likeBoardList(@PathVariable Long accountId,
                                                                   @PageableDefault(size = 20) Pageable pageable) {

        SliceDto<BoardSummaryResWithLikeId> response = boardService.findBoardsByLikes(accountId, pageable);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
