package travelRepo.global.security.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.entity.Role;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

public class OauthAccountSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProcessor jwtProcessor;
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final String frontDomain;

    public OauthAccountSuccessHandler(JwtProcessor jwtProcessor, AccountRepository accountRepository,
                                      BCryptPasswordEncoder bCryptPasswordEncoder, String frontDomain) {
        this.jwtProcessor = jwtProcessor;
        this.accountRepository = accountRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.frontDomain = frontDomain;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oauthUser.getAttributes().get("email"));

        if (!accountRepository.existsByEmail(email)) {
            String profile = String.valueOf(oauthUser.getAttributes().get("picture"));
            String nickname = String.valueOf(oauthUser.getAttributes().get("given_name"));

            if (accountRepository.existsByNickname(nickname)) {
                nickname = getNotDuplicatedNickname(nickname);
            }

            addOauthAccount(email, nickname, profile);
        }

        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        redirect(response, account);

    }

    public String getNotDuplicatedNickname(String name) {

        int number = 0;
        boolean flag = true;
        while (flag) {
            number++;
            if (!accountRepository.existsByNickname(name + number)) {
                flag = false;
            }
        }

        return name + number;
    }

    @Transactional
    public void addOauthAccount(String email, String nickname, String profile) {

        String randomPassword = UUID.randomUUID().toString().substring(0, 25);
        String encodePassword = bCryptPasswordEncoder.encode(randomPassword);

        Account account = Account.builder()
                .email(email)
                .password(encodePassword)
                .nickname(nickname)
                .profile(profile)
                .role(Role.USER)
                .build();

        accountRepository.save(account);
    }

    public void redirect(HttpServletResponse response, Account account) throws IOException {

        String jwt = jwtProcessor.createAuthJwtToken(new UserAccount(account));

        response.sendRedirect("http://" + frontDomain + "?jwt=" + jwt);
    }
}
