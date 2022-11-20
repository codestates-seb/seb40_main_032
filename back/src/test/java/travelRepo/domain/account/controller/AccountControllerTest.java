package travelRepo.domain.account.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import travelRepo.domain.account.dto.AccountModifyReq;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.dto.LoginDto;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.After;

import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class AccountControllerTest extends After {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("로그인_성공")
    void accountLogin() throws Exception {

        //given
        String email = "test1@test.com";
        String password = "12345678";

        LoginDto loginDto = new LoginDto(email, password);
        String content = gson.toJson(loginDto);


        //when
        ResultActions actions = mockMvc.perform(
                post("/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );


        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "login",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").description("이메일"),
                                        fieldWithPath("password").description("비밀번호")
                                )
                        ),
                        responseHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("회원 생성_성공")
    public void accountAdd_Success() throws Exception {

        //given
        String email = "test@test.com";
        String password = "12345678";
        String nickname = "testNickname";
        MockMultipartFile profile = new MockMultipartFile("profile", "profile.jpeg", "image/jpeg",
                "(file data)".getBytes());

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/accounts")
                        .file(profile)
                        .param("email", email)
                        .param("password", password)
                        .param("nickname", nickname)
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "accountAdd",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParts(
                                List.of(
                                        partWithName("profile").description("프로필 이미지")
                                )
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("email").description("이메일"),
                                        parameterWithName("password").description("비밀 번호"),
                                        parameterWithName("nickname").description("닉네임")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 Account 식별자")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("회원 생성_이메일 중복")
    public void accountAdd_DuplicateEmail() throws Exception {

        //given
        String email = "test1@test.com";
        String password = "12345678";
        String nickname = "testNickname";
        MockMultipartFile profile = new MockMultipartFile("profile", "profile.jpeg", "image/jpeg",
                "(file data)".getBytes());

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/accounts")
                        .file(profile)
                        .param("email", email)
                        .param("password", password)
                        .param("nickname", nickname)
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.DUPLICATION_EMAIL.getMessage()));
    }

    @Test
    @DisplayName("회원 생성_검증 실패")
    public void accountAdd_ValidationException() throws Exception {

        //given
        String email = "test@test.com";
        String password = "12345678";
        String nickname = "testNickname";
        MockMultipartFile profile = new MockMultipartFile("profile", "profile.jpeg", "image/jpeg",
                "(file data)".getBytes());

        //when
        ResultActions emailValidationEx = mockMvc.perform(
                multipart("/accounts")
                        .file(profile)
                        .param("email", "exceptionEmail")
                        .param("password", password)
                        .param("nickname", nickname)
        );
        ResultActions passwordValidationEx = mockMvc.perform(
                multipart("/accounts")
                        .file(profile)
                        .param("email", email)
                        .param("password", "1234")
                        .param("nickname", nickname)
        );
        ResultActions nicknameValidationEx = mockMvc.perform(
                multipart("/accounts")
                        .file(profile)
                        .param("email", email)
                        .param("password", password)
                        .param("nickname", "e")
        );
        ResultActions profileValidationEx = mockMvc.perform(
                multipart("/accounts")
                        .param("email", email)
                        .param("password", password)
                        .param("nickname", "e")
        );

        //then
        emailValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        passwordValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        nicknameValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        profileValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
    }

    @Test
    @DisplayName("회원 수정_성공")
    public void accountModify_Success() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        AccountModifyReq accountModifyReq = new AccountModifyReq();
        accountModifyReq.setPassword("123456789");
        accountModifyReq.setNickname("modifyTestNickname");
        accountModifyReq.setIntro("modifyTestIntro");
        accountModifyReq.setProfile("test/path");

        String content = gson.toJson(accountModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "accountModify",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("password").description("비밀 번호").optional(),
                                        fieldWithPath("nickname").description("닉네임").optional(),
                                        fieldWithPath("intro").description("소개글").optional(),
                                        fieldWithPath("profile").description("프로필 이미지 경로").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("수정된 Account 식별자")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("회원 수정_부분 성공")
    public void accountModify_PartSuccess() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        AccountModifyReq accountModifyReq = new AccountModifyReq();
        accountModifyReq.setIntro("modifyTestIntro");
        accountModifyReq.setProfile("test/path");

        String content = gson.toJson(accountModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원 수정_검증 실패")
    public void accountModify_ValidationException() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        AccountModifyReq passwordValidationExReq = new AccountModifyReq();
        passwordValidationExReq.setPassword("123");
        passwordValidationExReq.setNickname("modifyTestNickname");
        passwordValidationExReq.setIntro("modifyTestIntro");
        passwordValidationExReq.setProfile("test/path");

        String passwordExContent = gson.toJson(passwordValidationExReq);

        AccountModifyReq nicknameValidationExReq = new AccountModifyReq();
        nicknameValidationExReq.setPassword("123456789");
        nicknameValidationExReq.setNickname("e");
        nicknameValidationExReq.setIntro("modifyTestIntro");
        nicknameValidationExReq.setProfile("test/path");

        String nicknameExContent = gson.toJson(nicknameValidationExReq);

        //when
        ResultActions passwordValidationEx = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(passwordExContent)
        );
        ResultActions nicknameValidationEx = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(nicknameExContent)
        );


        //then
        passwordValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        nicknameValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
    }

    @Test
    @DisplayName("회원 수정_닉네임 중복")
    public void accountModify_DuplicateNickname() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        AccountModifyReq accountModifyReq = new AccountModifyReq();
        accountModifyReq.setPassword("123456789");
        accountModifyReq.setNickname("testNickname1");
        accountModifyReq.setIntro("modifyTestIntro");
        accountModifyReq.setProfile("test/path");

        String content = gson.toJson(accountModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/accounts/modify")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.DUPLICATION_NICKNAME.getMessage()));
    }

    @Test
    @DisplayName("회원 삭제_성공")
    public void accountRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        //when
        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.delete("/accounts")
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "accountRemove",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("회원 단일 조회_성공")
    public void accountDetails_Success() throws Exception {

        //given
        Long accountId = 10001L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(accountId))
                .andExpect(jsonPath("$.email").value( "test1@test.com"))
                .andExpect(jsonPath("$.nickname").value("testNickname1"))
                .andExpect(jsonPath("$.intro").value("testIntro"))
                .andExpect(jsonPath("$.profile").value("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"))
                .andExpect(jsonPath("$.following").value(2))
                .andExpect(jsonPath("$.follower").value(1))
                .andDo(document(
                        "accountDetails",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("accountId").description("Account 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("Account 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("intro").type(JsonFieldType.STRING).description("소개글"),
                                        fieldWithPath("profile").type(JsonFieldType.STRING).description("프로필 이미지"),
                                        fieldWithPath("following").type(JsonFieldType.NUMBER).description("팔로잉 수"),
                                        fieldWithPath("follower").type(JsonFieldType.NUMBER).description("팔로워 수")
                                )
                        )

                ));
    }

    @Test
    @DisplayName("로그인한 회원 조회_성공")
    public void loginAccountDetails_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/login")
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10001))
                .andExpect(jsonPath("$.email").value( "test1@test.com"))
                .andExpect(jsonPath("$.nickname").value("testNickname1"))
                .andExpect(jsonPath("$.profile").value("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"))
                .andDo(document(
                        "loginAccountDetails",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("Account 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("profile").type(JsonFieldType.STRING).description("프로필 이미지")
                                )
                        )

                ));
    }

    @Test
    @DisplayName("팔로우 회원 조회_성공")
    public void followAccountDetails_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));
        Long accountId = 10001L;
        String status = "following";

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/follow/{accountId}", accountId)
                        .param("page", "1")
                        .param("size", "5")
                        .param("sort", "createdAt,desc")
                        .param("status", status)
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "followAccountDetails",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT").optional()
                                )
                        ),
                        pathParameters(
                                parameterWithName("accountId").description("Account 식별자")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("페이지 번호(default = 1)").optional(),
                                        parameterWithName("size").description("페이징 크기(default = 10)").optional(),
                                        parameterWithName("sort").description("정렬 조건(default = follow 생성일자)").optional(),
                                        parameterWithName("status").description("following 또는 follower")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("Account 목록"),
                                        fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("Account 식별자"),
                                        fieldWithPath("content[].nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("content[].profile").type(JsonFieldType.STRING).description("프로필 이미지"),
                                        fieldWithPath("content[].follow").type(JsonFieldType.BOOLEAN).description("팔로잉 상태"),
                                        fieldWithPath("content[].boards[].id").type(JsonFieldType.NUMBER).description("Board 식별자"),
                                        fieldWithPath("content[].boards[].thumbnail").type(JsonFieldType.STRING).description("Board 썸네일"),
                                        fieldWithPath("content[].boards[].title").type(JsonFieldType.STRING).description("Board 제목"),
                                        fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수"),
                                        fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("전체 Question 개수"),
                                        fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("첫 페이지 여부"),
                                        fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부"),
                                        fieldWithPath("sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이징 size"),
                                        fieldWithPath("pageNumber").type(JsonFieldType.NUMBER).description("페이지 번호(1부터 시작)"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("페이징된 Question 개수")
                                )
                        )

                ));
    }

}