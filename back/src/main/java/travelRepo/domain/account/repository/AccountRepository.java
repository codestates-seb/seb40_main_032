package travelRepo.domain.account.repository;

import travelRepo.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long>{

    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);
}
