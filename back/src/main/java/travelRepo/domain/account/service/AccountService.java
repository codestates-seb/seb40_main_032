package travelRepo.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.dto.AccountDetailsRes;
import travelRepo.domain.account.dto.AccountModifyReq;
import travelRepo.domain.account.dto.AccountAddReq;
import travelRepo.domain.account.dto.AccountModifyReq;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.follow.repository.FollowRepository;
import travelRepo.domain.board.repository.BoardPhotoRepository;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.domain.likes.likesRepository.LikesRepository;
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
    private final FollowRepository followRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final BoardTagRepository boardTagRepository;
    private final BoardPhotoRepository boardPhotoRepository;
    private final LikesRepository likesRepository;
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

    @Transactional
    public IdDto modifyAccount(Long loginAccountId, AccountModifyReq accountModifyReq) throws IOException {

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

        int following = followRepository.findByFollower(account).size();
        int follower = followRepository.findByFollowing(account).size();

        return AccountDetailsRes.of(account, following, follower);
    }

    private void verifyDuplicateEmail(AccountAddReq accountAddReq) {

        if (accountRepository.existsByEmail(accountAddReq.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATION_EMAIL);
        }
    }
}
