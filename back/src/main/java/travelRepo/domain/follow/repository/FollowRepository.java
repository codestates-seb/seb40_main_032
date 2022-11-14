package travelRepo.domain.follow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.follow.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Follow follow " +
            "where follow.follower.id = :accountId or follow.following.id = :accountId")
    void deleteByAccountId(@Param("accountId") Long accountId);
}
