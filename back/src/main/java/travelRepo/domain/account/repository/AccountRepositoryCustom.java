package travelRepo.domain.account.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import travelRepo.domain.account.entity.Account;

public interface AccountRepositoryCustom {

    Page<Account> findByFollow(Long accountId, String status, Pageable pageable);
}
