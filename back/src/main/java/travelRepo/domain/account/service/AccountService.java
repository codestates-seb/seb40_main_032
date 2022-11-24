package travelRepo.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.dto.*;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.repository.BoardPhotoRepository;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.domain.follow.repository.FollowRepository;
import travelRepo.domain.likes.likesRepository.LikesRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.image.service.ImageService;

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
    private final ImageService imageService;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${dir}")
    private String path;

    @Transactional
    public IdDto addAccount(AccountAddReq accountAddReq) {

        verifyDuplicateEmail(accountAddReq.getEmail());
        verifyDuplicateNickname(accountAddReq.getNickname());

        String encodePassword = bCryptPasswordEncoder.encode(accountAddReq.getPassword());
        String profile = imageService.uploadImage(accountAddReq.getProfile(), path);

        Account account = accountAddReq.toAccount(encodePassword, profile);
        Account savedAccount = accountRepository.save(account);

        return new IdDto(savedAccount.getId());
    }

    @Transactional
    @CacheEvict(key = "#loginAccountId", value = {"findAccount", "findLoginAccount"})
    public IdDto modifyAccount(Long loginAccountId, AccountModifyReq accountModifyReq) {

        verifyDuplicateNickname(accountModifyReq.getNickname());

        Account account = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        String encodePassword = null;
        if (accountModifyReq.getPassword() != null) {
            encodePassword = bCryptPasswordEncoder.encode(accountModifyReq.getPassword());
        }
        Account modifyAccount = accountModifyReq.toAccount(encodePassword);
        account.modify(modifyAccount);

        removeBoardFromRedis(loginAccountId);

        return new IdDto(account.getId());
    }

    @Transactional
    @CacheEvict(key = "#loginAccountId", value = {"findAccount", "findLoginAccount"})
    public void removeAccount(Long loginAccountId) {

        likesRepository.deleteByAccountId(loginAccountId);
        commentRepository.deleteByAccountId(loginAccountId);
        boardPhotoRepository.deleteByAccountId(loginAccountId);
        boardTagRepository.deleteByAccountId(loginAccountId);
        boardRepository.deleteByAccountId(loginAccountId);

        followRepository.deleteByAccountId(loginAccountId);
        accountRepository.deleteById(loginAccountId);

        removeBoardFromRedis(loginAccountId);
    }

    @Cacheable(key = "#accountId", value = "findAccount")
    public AccountDetailsRes findAccount(Long accountId) {

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Long following = followRepository.countByFollower(account);
        Long follower = followRepository.countByFollowing(account);

        return AccountDetailsRes.of(account, following, follower);
    }

    @Cacheable(key = "#loginAccountId", value = "findLoginAccount")
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

    private void verifyDuplicateEmail(String email) {

        if (email != null) {
            if (accountRepository.existsByEmail(email)) {
                throw new BusinessLogicException(ExceptionCode.DUPLICATION_EMAIL);
            }
        }
    }

    private void verifyDuplicateNickname(String nickname) {

        if (nickname != null) {
            if (accountRepository.existsByNickname(nickname)) {
                throw new BusinessLogicException(ExceptionCode.DUPLICATION_NICKNAME);
            }
        }
    }

    private void removeBoardFromRedis(Long accountId) {

        List<Board> boards = boardRepository.findByAccountId(accountId);
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        for (Board board : boards) {
            String key = "findBoard::" + board.getId();
            if (valueOperations.get(key) == null) {
                continue;
            }
            redisTemplate.delete(key);
        }
    }
}
