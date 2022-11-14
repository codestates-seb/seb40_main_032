package travelRepo.domain.follow.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.follow.entity.Follow;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollowing(Account account);

    List<Follow> findByFollower(Account account);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Follow follow " +
            "where follow.follower.id = :accountId or follow.following.id = :accountId")
    void deleteByAccountId(@Param("accountId") Long accountId);
}
