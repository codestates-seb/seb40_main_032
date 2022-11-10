package travelRepo.domain.account.controller;

import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public String signUp(@RequestBody Account account) {

        accountService.signUp(account);

        return "success signUp";
    }
}
