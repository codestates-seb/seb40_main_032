package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.AccountAddReq;
import travelRepo.domain.account.dto.AccountDetailsRes;
import travelRepo.domain.account.dto.AccountModifyReq;
import travelRepo.global.common.dto.IdDto;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    @PostMapping
    public ResponseEntity<IdDto> accountAdd(@ModelAttribute AccountAddReq accountAddReq) {
        return new ResponseEntity<>(new IdDto(1L), HttpStatus.CREATED);
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<IdDto> accountModify(@PathVariable Long accountId,
                                               @ModelAttribute AccountModifyReq accountModifyReq) {
        return new ResponseEntity<>(new IdDto(1L), HttpStatus.OK);
    }

    @DeleteMapping
    public void accountRemove() {
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDetailsRes> accountDetails(@PathVariable Long accountId) {

        AccountDetailsRes accountDetailsRes = new AccountDetailsRes();
        accountDetailsRes.setId(1L);
        accountDetailsRes.setEmail("mock@mock.com");
        accountDetailsRes.setNickname("mockNickname");
        accountDetailsRes.setProfile("mock/path");

        return new ResponseEntity<>(accountDetailsRes, HttpStatus.OK);
    }
}
