package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelRepo.domain.account.dto.AccountAddReq;
import travelRepo.domain.account.service.AccountService;
import travelRepo.global.common.dto.IdResDto;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<IdResDto> accountAdd(@ModelAttribute AccountAddReq accountAddReq) {
        return new ResponseEntity<>(new IdResDto(1L), HttpStatus.CREATED);
    }
}
