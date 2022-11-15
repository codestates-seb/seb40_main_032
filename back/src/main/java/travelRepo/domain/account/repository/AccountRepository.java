package travelRepo.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.account.entity.Account;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long>, AccountRepositoryCustom{

    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("select follow.following from Follow follow " +
            "where follow.follower.id = :accountId")
    List<Account> findByFollowing(@Param("accountId") Long accountId);
}
