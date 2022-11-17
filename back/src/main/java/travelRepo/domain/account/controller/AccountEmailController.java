package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import travelRepo.domain.account.dto.TempPasswordGuideSendReq;
import travelRepo.domain.account.service.AccountEmailService;

@Controller
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountEmailController {

    private final AccountEmailService accountEmailService;

    @ResponseBody
    @PostMapping("/tempPasswordGuide")
    public void TempPasswordGuidSend(@RequestBody TempPasswordGuideSendReq tempPasswordGuideSendReq) {

        accountEmailService.sendTempPasswordGuide(tempPasswordGuideSendReq);
    }
}
