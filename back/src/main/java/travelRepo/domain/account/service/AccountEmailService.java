package travelRepo.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import travelRepo.domain.account.dto.TempPasswordGuideSendReq;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.mail.EmailMessageDto;
import travelRepo.global.mail.EmailService;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountEmailService {

    private final AccountRepository accountRepository;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    @Transactional
    public void sendTempPasswordGuide(TempPasswordGuideSendReq tempPasswordGuideSendReq) {

        Account account = accountRepository.findByEmail(tempPasswordGuideSendReq.getEmail())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        if (!account.canSendTempPasswordGuide()) {
            throw new BusinessLogicException(ExceptionCode.TEMP_PASSWORD_DELAY);
        }

        account.createTempPassword();

        Context context = new Context();
        context.setVariable("link", "/accounts/tempPassword/" + account.getId());
        context.setVariable("nickname", account.getNickname());
        context.setVariable("linkName", "임시 비밀번호 발급");
        context.setVariable("message", "임시 비밀번호로 변경하려면 링크를 클릭하세요");
        context.setVariable("tempPassword", account.getTempPassword());
        context.setVariable("host", "http://localhost:8080");

        String message = templateEngine.process("mail/simple-link", context);

        EmailMessageDto emailMessageDto = EmailMessageDto.builder()
                .to(account.getEmail())
                .subject("TravelRepo, 임시 비밀번호 발급")
                .message(message)
                .build();

        emailService.sendEmail(emailMessageDto);
        account.setTempPasswordEmailSendAt();
    }

}
