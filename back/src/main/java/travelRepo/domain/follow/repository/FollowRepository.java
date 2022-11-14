package travelRepo.domain.follow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.follow.entity.Follow;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollowing(Account account);

    List<Follow> findByFollower(Account account);
}
