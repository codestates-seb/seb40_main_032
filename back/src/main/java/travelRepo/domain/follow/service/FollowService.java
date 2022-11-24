package travelRepo.domain.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.follow.dto.FollowCheckRes;
import travelRepo.domain.follow.repository.FollowRepository;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.follow.dto.FollowPostRes;
import travelRepo.domain.follow.entity.Follow;
import travelRepo.global.common.enums.Status;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final AccountRepository accountRepository;

    @Transactional
    @Caching(evict = {
            @CacheEvict(key = "#loginAccountId", value = "findAccount"),
            @CacheEvict(key = "#accountId", value = "findAccount")
    })
    public FollowPostRes postFollow(Long loginAccountId, Long accountId) {

        verifySelfFollow(loginAccountId, accountId);
        Account loginAccount = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Optional<Follow> optionalFollow = followRepository.findByFollowerAndFollowing(loginAccount, account);
        if (optionalFollow.isEmpty()) {

            Follow follow = Follow.builder()
                    .follower(loginAccount)
                    .following(account)
                    .build();
            followRepository.save(follow);

            return FollowPostRes.of(Status.SUCCESS);
        }

        Follow follow = optionalFollow.get();
        followRepository.delete(follow);

        return FollowPostRes.of(Status.CANCEL);
    }

    public FollowCheckRes checkFollow(Long loginAccountId, Long accountId) {

        boolean follow = followRepository.existsByFollower_IdAndFollowing_Id(loginAccountId, accountId);

        return FollowCheckRes.of(follow);
    }

    private void verifySelfFollow(Long loginAccountId, Long accountId) {
        if (loginAccountId.equals(accountId)) {
            throw new BusinessLogicException(ExceptionCode.SELF_FOLLOW);
        }
    }
}
