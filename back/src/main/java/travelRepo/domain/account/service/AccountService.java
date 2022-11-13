package travelRepo.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.dto.AccountAddReq;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.upload.service.UploadService;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UploadService uploadService;

    @Transactional
    public IdDto addAccount(AccountAddReq accountAddReq) throws IOException {

        verifyDuplicateEmail(accountAddReq);

        String encodePassword = bCryptPasswordEncoder.encode(accountAddReq.getPassword());
        String profile = uploadService.upload(accountAddReq.getProfile());

        Account account = accountAddReq.toAccount(encodePassword, profile);
        Account savedAccount = accountRepository.save(account);

        return new IdDto(savedAccount.getId());
    }

    private void verifyDuplicateEmail(AccountAddReq accountAddReq) {
        if (accountRepository.existsByEmail(accountAddReq.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATION_EMAIL);
        }
    }

}
