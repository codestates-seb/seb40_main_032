package travelRepo.global.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@ConditionalOnProperty(value = "mod", havingValue = "local")
public class LocalEmailService implements EmailService{

    @Override
    public void sendEmail(EmailMessageDto emailMessage) {
        log.info("sent email: {} -> {}", emailMessage.getMessage(), emailMessage.getTo());
    }
}
