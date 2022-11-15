package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.*;
import travelRepo.domain.account.service.AccountService;
import travelRepo.domain.board.dto.FollowBoardDetailsRes;
import travelRepo.global.argumentresolver.LoginAccountId;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.PageDto;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<IdDto> accountAdd(@Valid @ModelAttribute AccountAddReq accountAddReq) {

        IdDto idDto = accountService.addAccount(accountAddReq);

        return new ResponseEntity<>(idDto, HttpStatus.CREATED);
    }

    @PostMapping("/modify")
    public ResponseEntity<IdDto> accountModify(@LoginAccountId Long loginAccountId,
                                               @Valid @ModelAttribute AccountModifyReq accountModifyReq) {

        IdDto idDto = accountService.modifyAccount(loginAccountId, accountModifyReq);

        return new ResponseEntity<>(idDto, HttpStatus.OK);
    }

    @DeleteMapping
    public void accountRemove(@LoginAccountId Long loginAccountId) {
        accountService.removeAccount(loginAccountId);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDetailsRes> accountDetails(@PathVariable Long accountId) {

        AccountDetailsRes accountDetailsRes = accountService.findAccount(accountId);

        return new ResponseEntity<>(accountDetailsRes, HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<LoginAccountDetailsRes> loginAccountDetails(@LoginAccountId Long loginAccountId) {

        LoginAccountDetailsRes loginAccountDetailsRes = accountService.findLoginAccount(loginAccountId);

        return new ResponseEntity<>(loginAccountDetailsRes, HttpStatus.OK);
    }

    @GetMapping("/follow/{accountId}")
    public ResponseEntity<PageDto<FollowAccountDetailsRes>> followAccountList(@PathVariable Long accountId,
                                                                              @RequestParam String status,
                                                                              Pageable pageable) {

        List<FollowAccountDetailsRes> followAccountDetailsResList = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            FollowAccountDetailsRes followAccountDetailsRes = new FollowAccountDetailsRes();
            followAccountDetailsRes.setId(1L + i * 6);
            followAccountDetailsRes.setNickname("mockNickname" + (1L + i * 6));
            followAccountDetailsRes.setProfile("/mock/path" + (1L + i * 6));

            for (int j = 0; j < 5; j++) {
                FollowBoardDetailsRes followBoardDetailsRes = new FollowBoardDetailsRes();
                followBoardDetailsRes.setId(2L + j + i * 6);
                followBoardDetailsRes.setTitle("mockTitle" + (2L + j + i * 6));
                followBoardDetailsRes.setThumbnail("/mock/path" + (2L + j + i * 6));

                followAccountDetailsRes.getBoards().add(followBoardDetailsRes);
            }

            followAccountDetailsResList.add(followAccountDetailsRes);
        }

        Page<FollowAccountDetailsRes> response = new PageImpl<>(followAccountDetailsResList, pageable, 30);
        return new ResponseEntity<>(new PageDto<>(response), HttpStatus.OK);
    }
}
