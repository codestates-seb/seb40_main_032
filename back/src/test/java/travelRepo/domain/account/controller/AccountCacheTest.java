package travelRepo.domain.account.controller;

import com.google.gson.Gson;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.dto.AccountModifyReq;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.After;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class AccountCacheTest extends After {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("회원 조회 캐싱_성공")
    void accountAddCache_Success() throws Exception {

        //given
        Long accountId = 10001L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );

        String findAccount = valueOperations.get("findAccount::" + accountId);

        //then
        actions.andExpect(status().isOk());

        assertThat(findAccount).isNotNull();
    }

    @Test
    @DisplayName("회원 수정 캐싱 삭제_성공")
    void accountModifyCache_Success() throws Exception {

        //given
        Long accountId = 10001L;
        Long boardId1 = 12001L;
        Long boardId2 = 12004L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        AccountModifyReq accountModifyReq = new AccountModifyReq();
        accountModifyReq.setPassword("123456789");
        accountModifyReq.setNickname("modifyTestNickname");
        accountModifyReq.setIntro("modifyTestIntro");
        accountModifyReq.setProfile("test/path");

        String content = gson.toJson(accountModifyReq);

        mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId1)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId2)
        );

        //when
        ResultActions actions = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        String findAccount = valueOperations.get("findAccount::" + accountId);
        String findBoard1 = valueOperations.get("findBoard::" + boardId1);
        String findBoard2 = valueOperations.get("findBoard::" + boardId2);

        actions.andExpect(status().isOk());
        assertThat(findAccount).isNull();
        assertThat(findBoard1).isNull();
        assertThat(findBoard2).isNull();
    }

    @Test
    @DisplayName("회원 수정 캐싱 삭제_실패")
    void accountModifyCache_Fail() throws Exception {

        //given
        Long accountId = 10001L;
        Long boardId1 = 12001L;
        Long boardId2 = 12004L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        AccountModifyReq accountModifyReq = new AccountModifyReq();
        accountModifyReq.setPassword("12");
        accountModifyReq.setNickname("modifyTestNickname");
        accountModifyReq.setIntro("modifyTestIntro");
        accountModifyReq.setProfile("test/path");

        String content = gson.toJson(accountModifyReq);

        mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId1)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId2)
        );

        //when
        ResultActions actions = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        String findAccount = valueOperations.get("findAccount::" + accountId);
        String findBoard1 = valueOperations.get("findBoard::" + boardId1);
        String findBoard2 = valueOperations.get("findBoard::" + boardId2);

        actions.andExpect(status().isBadRequest());
        assertThat(findAccount).isNotNull();
        assertThat(findBoard1).isNotNull();
        assertThat(findBoard2).isNotNull();
    }

    @Test
    @DisplayName("회원 삭제 캐싱 삭제_성공")
    void accountRemoveCache_Success() throws Exception {

        //given
        Long accountId = 10001L;
        Long boardId1 = 12001L;
        Long boardId2 = 12004L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId1)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId2)
        );

        //when
        ResultActions actions = mockMvc.perform(
                delete("/accounts")
                        .header("Authorization", jwt)
        );

        //then
        String findAccount = valueOperations.get("findAccount::" + accountId);
        String findBoard1 = valueOperations.get("findBoard::" + boardId1);
        String findBoard2 = valueOperations.get("findBoard::" + boardId2);

        actions.andExpect(status().isOk());
        assertThat(findAccount).isNull();
        assertThat(findBoard1).isNull();
        assertThat(findBoard2).isNull();
    }

    @Test
    @DisplayName("회원 삭제 캐싱 삭제_실패")
    void accountRemoveCache_Fail() throws Exception {

        //given
        Long accountId = 10001L;
        Long boardId1 = 12001L;
        Long boardId2 = 12004L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bea " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId1)
        );
        mockMvc.perform(
                get("/boards/{boardId}", boardId2)
        );

        //when
        ResultActions actions = mockMvc.perform(
                delete("/accounts")
                        .header("Authorization", jwt)
        );

        //then
        String findAccount = valueOperations.get("findAccount::" + accountId);
        String findBoard1 = valueOperations.get("findBoard::" + boardId1);
        String findBoard2 = valueOperations.get("findBoard::" + boardId2);

        actions.andExpect(status().isUnauthorized());
        assertThat(findAccount).isNotNull();
        assertThat(findBoard1).isNotNull();
        assertThat(findBoard2).isNotNull();
    }
}
