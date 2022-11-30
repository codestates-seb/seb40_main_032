package travelRepo.domain.board.controller;

import com.google.gson.Gson;
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
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.BoardModifyReq;
import travelRepo.domain.board.entity.Category;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.After;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class BoardCacheTest extends After {

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
    @DisplayName("게시물 단일 조회 캐싱_성공")
    void boardDetailsCache_Success() throws Exception {

        // given
        Long boardId = 12001L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        // when
        ResultActions actions = mockMvc.perform(
                get("/boards/{boardId}", boardId)
        );

        //then
        String findBoard = valueOperations.get("findBoard::" + boardId);

        actions.andExpect(status().isOk());
        assertThat(findBoard).isNotNull();
    }

    @Test
    @DisplayName("게시물 수정 캐싱 삭제_성공")
    void boardModifyCache_Success() throws Exception {

        //given
        Long accountId = 10001L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12001L;

        BoardModifyReq boardModifyReq = new BoardModifyReq();
        boardModifyReq.setTitle("modified board title");
        boardModifyReq.setContent("modified board content");
        boardModifyReq.setLocation("modified board location");
        boardModifyReq.setCategory(Category.RESTAURANT);
        boardModifyReq.setTags(List.of("tag3", "tag2", "tag1"));
        String content = gson.toJson(boardModifyReq);

        mockMvc.perform(
                get("/boards/{boardId}", boardId)
        );

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        String findBoard = valueOperations.get("findBoard::" + boardId);

        actions.andExpect(status().isOk());
        assertThat(findBoard).isNull();
    }

    @Test
    @DisplayName("게시물 수정 캐싱 삭제_실패")
    void boardModifyCache_Fail() throws Exception {

        //given
        Long accountId = 10001L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12001L;

        BoardModifyReq boardModifyReq = new BoardModifyReq();
        boardModifyReq.setTitle("m");
        boardModifyReq.setContent("modified board content");
        boardModifyReq.setLocation("modified board location");
        boardModifyReq.setCategory(Category.RESTAURANT);
        boardModifyReq.setTags(List.of("tag3", "tag2", "tag1"));
        String content = gson.toJson(boardModifyReq);

        mockMvc.perform(
                get("/boards/{boardId}", boardId)
        );

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        String findBoard = valueOperations.get("findBoard::" + boardId);

        actions.andExpect(status().isBadRequest());
        assertThat(findBoard).isNotNull();
    }

    @Test
    @DisplayName("게시물 삭제 캐싱 삭제_성공")
    void boardRemoveCache_Success() throws Exception {

        //given
        Long accountId = 10001L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12001L;

        mockMvc.perform(
                get("/boards/{boardId}", boardId)
        );

        //when
        ResultActions actions = mockMvc.perform(
                delete("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
        );

        //then
        String findBoard = valueOperations.get("findBoard::" + boardId);
        String boardView = valueOperations.get("boardView::" + boardId);

        actions.andExpect(status().isOk());
        assertThat(findBoard).isNull();
        assertThat(boardView).isNull();
    }

    @Test
    @DisplayName("게시물 삭제 캐싱 삭제_실패")
    void boardRemoveCache_Fail() throws Exception {

        //given
        Long accountId = 10001L;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bea " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12001L;

        mockMvc.perform(
                get("/boards/{boardId}", boardId)
        );

        //when
        ResultActions actions = mockMvc.perform(
                delete("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
        );

        //then
        String findBoard = valueOperations.get("findBoard::" + boardId);
        String boardView = valueOperations.get("boardView::" + boardId);

        actions.andExpect(status().isUnauthorized());
        assertThat(findBoard).isNotNull();
        assertThat(boardView).isNotNull();
    }
}
