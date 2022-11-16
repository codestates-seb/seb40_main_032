package travelRepo.domain.follow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.follow.entity.Follow;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Long countByFollowing(Account account);

    Long countByFollower(Account account);

    @Modifying(flushAutomatically = true)
    @Query("delete from Follow follow " +
            "where follow.follower.id = :accountId or follow.following.id = :accountId")
    void deleteByAccountId(@Param("accountId") Long accountId);

    Optional<Follow> findByFollowerAndFollowing(Account follower, Account following);
}
