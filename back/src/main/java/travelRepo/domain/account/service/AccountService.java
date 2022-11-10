package travelRepo.domain.account.service;

import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.entity.Role;
import travelRepo.domain.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void signUp(Account account) {

        String encodedPassword = bCryptPasswordEncoder.encode(account.getPassword());
        account.setPassword(encodedPassword);
        account.setRole(Role.USER);

        accountRepository.save(account);
    }
}
