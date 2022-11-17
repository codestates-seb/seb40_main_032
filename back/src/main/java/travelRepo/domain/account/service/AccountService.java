package travelRepo.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import travelRepo.domain.account.dto.*;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.repository.BoardPhotoRepository;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.domain.follow.repository.FollowRepository;
import travelRepo.domain.likes.likesRepository.LikesRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.mail.EmailMessageDto;
import travelRepo.global.mail.EmailService;
import travelRepo.global.upload.service.UploadService;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final FollowRepository followRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final BoardTagRepository boardTagRepository;
    private final BoardPhotoRepository boardPhotoRepository;
    private final LikesRepository likesRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UploadService uploadService;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    @Transactional
    public IdDto addAccount(AccountAddReq accountAddReq) {

        verifyDuplicateEmail(accountAddReq);

        String encodePassword = bCryptPasswordEncoder.encode(accountAddReq.getPassword());
        String profile = uploadService.upload(accountAddReq.getProfile());

        Account account = accountAddReq.toAccount(encodePassword, profile);
        Account savedAccount = accountRepository.save(account);

        return new IdDto(savedAccount.getId());
    }

    @Transactional
    public IdDto modifyAccount(Long loginAccountId, AccountModifyReq accountModifyReq) {

        Account account = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        String profile = uploadService.upload(accountModifyReq.getProfile());
        Account modifyAccount = accountModifyReq.toAccount(profile);
        account.modify(modifyAccount);

        return new IdDto(account.getId());
    }

    @Transactional
    public void removeAccount(Long loginAccountId) {

        likesRepository.deleteByAccountId(loginAccountId);
        commentRepository.deleteByAccountId(loginAccountId);
        boardPhotoRepository.deleteByAccountId(loginAccountId);
        boardTagRepository.deleteByAccountId(loginAccountId);
        boardRepository.deleteByAccountId(loginAccountId);

        followRepository.deleteByAccountId(loginAccountId);
        accountRepository.deleteById(loginAccountId);
    }

    public AccountDetailsRes findAccount(Long accountId) {

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Long following = followRepository.countByFollower(account);
        Long follower = followRepository.countByFollowing(account);

        return AccountDetailsRes.of(account, following, follower);
    }

    public LoginAccountDetailsRes findLoginAccount(Long loginAccountId) {

        Account account = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        return LoginAccountDetailsRes.of(account);
    }

    public Page<FollowAccountDetailsRes> findFollowAccounts(Long loginAccountId, Long accountId, String status,
                                                            Pageable pageable) {

        Page<Account> accountPage = accountRepository.findByFollow(accountId, status, pageable);
        List<Account> Following = accountRepository.findByFollowing(loginAccountId);

        return accountPage.map(account -> {
            FollowAccountDetailsRes followAccountDetailsRes = FollowAccountDetailsRes.of(account);
            if (Following.contains(account)) {
                followAccountDetailsRes.setFollow(true);
            }
            return followAccountDetailsRes;
        });
    }

    @Transactional
    public void sendTempPasswordGuide(TempPasswordGuideSendReq tempPasswordGuideSendReq) {

        Account account = accountRepository.findByEmail(tempPasswordGuideSendReq.getEmail())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        account.createTempPassword();

        Context context = new Context();
        context.setVariable("link", "/accounts/tempPassword/" + account.getId());
        context.setVariable("nickname", account.getNickname());
        context.setVariable("linkName", "임시 비밀번호 발급");
        context.setVariable("message", "임시 비밀번호를 발급하려면 링크를 클릭하세요");
        context.setVariable("tempPassword", account.getTempPassword());
        context.setVariable("host", "http://localhost:8080");

        String message = templateEngine.process("mail/simple-link", context);

        EmailMessageDto emailMessageDto = EmailMessageDto.builder()
                .to(account.getEmail())
                .subject("TravelRepo, 임시 비밀번호 발급")
                .message(message)
                .build();

        emailService.sendEmail(emailMessageDto);
    }

    private void verifyDuplicateEmail(AccountAddReq accountAddReq) {

        if (accountRepository.existsByEmail(accountAddReq.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATION_EMAIL);
        }
    }
}
