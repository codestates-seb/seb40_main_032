package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.*;
import travelRepo.domain.account.service.AccountService;
import travelRepo.global.argumentresolver.LoginAccountId;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.PageDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import javax.validation.Valid;

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
                                               @Valid @RequestBody AccountModifyReq accountModifyReq) {

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
    public ResponseEntity<PageDto<FollowAccountDetailsRes>> followAccountList(@LoginAccountId Long loginAccountId,
                                                                              @PathVariable Long accountId,
                                                                              @RequestParam String status,
                                                                              Pageable pageable) {

        if (!status.equals("following") && !status.equals("follower")) {
            throw new BusinessLogicException(ExceptionCode.IlLEGAL_PARAMETER);
        }

        Page<FollowAccountDetailsRes> response =
                accountService.findFollowAccounts(loginAccountId, accountId, status, pageable);

        return new ResponseEntity<>(new PageDto<>(response), HttpStatus.OK);
    }
}
