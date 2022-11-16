package travelRepo.domain.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.follow.dto.FollowCheckRes;
import travelRepo.domain.follow.repository.FollowRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;

    public FollowCheckRes checkFollow(Long loginAccountId, Long accountId) {

        boolean follow = followRepository.existsByFollower_IdAndFollowing_Id(loginAccountId, accountId);

        return FollowCheckRes.of(follow);
    }
}
