package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.TempPasswordGuideSendReq;
import travelRepo.domain.account.service.AccountEmailService;

@Controller
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountEmailController {

    private final AccountEmailService accountEmailService;

    @ResponseBody
    @PostMapping("/tempPassword/email")
    public void TempPasswordGuidSend(@RequestBody TempPasswordGuideSendReq tempPasswordGuideSendReq) {

        accountEmailService.sendTempPasswordGuide(tempPasswordGuideSendReq);
    }

    @GetMapping("/tempPassword/{accountId}")
    public String TempPasswordApply(@PathVariable Long accountId, @RequestParam String tempPassword) {

        accountEmailService.applyTempPassword(accountId, tempPassword);
        return "/login";
    }
}
