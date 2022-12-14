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
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import travelRepo.domain.account.dto.AccountModifyReq;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.entity.Role;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.dto.LoginDto;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.Treatment;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
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
class AccountControllerTest extends Treatment {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("?????????_??????")
    void accountLogin_Success() throws Exception {

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
                                        fieldWithPath("email").description("?????????"),
                                        fieldWithPath("password").description("????????????")
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
    @DisplayName("?????????_??????")
    void accountLogin_Fail() throws Exception {

        //given
        String failPasswordForm = gson.toJson(new LoginDto("test1@test.com", "1"));
        String illegalParameterForm = gson.toJson(new LoginDto(" ", ""));


        //when
        ResultActions failPassword = mockMvc.perform(
                post("/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(failPasswordForm)
        );
        ResultActions illegalForm = mockMvc.perform(
                post("/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(illegalParameterForm)
        );


        //then
        failPassword
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.exception").value("FailToAuthentication"))
                .andExpect(jsonPath("$.message").value(ExceptionCode.FAIL_AUTHENTICATION.getMessage()));
        illegalForm
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.exception").value("FailToAuthentication"))
                .andExpect(jsonPath("$.message").value(ExceptionCode.FAIL_AUTHENTICATION.getMessage()));
    }

    @Test
    @DisplayName("?????? ??????_??????")
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
        Account account = accountRepository.findByEmail("test@test.com")
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(account.getId()))
                .andDo(document(
                        "accountAdd",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParts(
                                List.of(
                                        partWithName("profile").description("????????? ?????????")
                                )
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("email").description("?????????"),
                                        parameterWithName("password").description("?????? ??????"),
                                        parameterWithName("nickname").description("?????????")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("????????? Account ?????????")
                                )
                        )
                ));

        assertThat(account.getEmail()).isEqualTo(email);
        assertThat(account.getNickname()).isEqualTo(nickname);
        assertThat(passwordEncoder.matches(password, account.getPassword())).isTrue();
        assertThat(account.getProfile()).isNotNull();
        assertThat(account.getRole()).isEqualTo(Role.USER);
    }

    @Test
    @DisplayName("?????? ??????_????????? ??????")
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
    @DisplayName("?????? ??????_?????? ??????")
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
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
        passwordValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
        nicknameValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
        profileValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
    }

    @Test
    @DisplayName("?????? ??????_??????")
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
        Account modifiedAccount = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(accountId))
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
                                        fieldWithPath("password").description("?????? ??????").optional(),
                                        fieldWithPath("nickname").description("?????????").optional(),
                                        fieldWithPath("intro").description("?????????").optional(),
                                        fieldWithPath("profile").description("????????? ????????? ??????").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("????????? Account ?????????")
                                )
                        )
                ));

        assertThat(passwordEncoder.matches(accountModifyReq.getPassword(), modifiedAccount.getPassword())).isTrue();
        assertThat(modifiedAccount.getNickname()).isEqualTo(accountModifyReq.getNickname());
        assertThat(modifiedAccount.getIntro()).isEqualTo(accountModifyReq.getIntro());
        assertThat(modifiedAccount.getProfile()).isEqualTo(accountModifyReq.getProfile());
    }

    @Test
    @DisplayName("?????? ??????_?????? ??????")
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
        Account modifiedAccount = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(accountId));

        assertThat(modifiedAccount.getIntro()).isEqualTo(accountModifyReq.getIntro());
        assertThat(modifiedAccount.getProfile()).isEqualTo(accountModifyReq.getProfile());
    }

    @Test
    @DisplayName("?????? ??????_?????? ??????")
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
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
        nicknameValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
    }

    @Test
    @DisplayName("?????? ??????_????????? ??????")
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
    @DisplayName("?????? ??????_??????")
    public void accountRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        //when
        ResultActions actions = mockMvc.perform(
                delete("/accounts")
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
    @DisplayName("?????? ??????_??????")
    public void accountRemove_Double() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        mockMvc.perform(
                delete("/accounts")
                        .header("Authorization", jwt));

        //when
        ResultActions actions = mockMvc.perform(
                delete("/accounts")
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.FAIL_REMOVE_ACCOUNT.getMessage()));
    }

    @Test
    @DisplayName("?????? ?????? ??????_??????")
    public void accountDetails_Success() throws Exception {

        //given
        Long accountId = 10001L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );

        //then
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(accountId))
                .andExpect(jsonPath("$.email").value(account.getEmail()))
                .andExpect(jsonPath("$.nickname").value(account.getNickname()))
                .andExpect(jsonPath("$.intro").value(account.getIntro()))
                .andExpect(jsonPath("$.profile").value(account.getProfile()))
                .andExpect(jsonPath("$.following").value(6))
                .andExpect(jsonPath("$.follower").value(6))
                .andDo(document(
                        "accountDetails",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("accountId").description("Account ?????????")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("Account ?????????"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("intro").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("profile").type(JsonFieldType.STRING).description("????????? ?????????"),
                                        fieldWithPath("following").type(JsonFieldType.NUMBER).description("????????? ???"),
                                        fieldWithPath("follower").type(JsonFieldType.NUMBER).description("????????? ???")
                                )
                        )

                ));
    }

    @Test
    @DisplayName("?????? ?????? ??????_????????? Id")
    public void accountDetails_IllegalId() throws Exception {

        //given
        Long accountId = 101021L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.NOT_FOUND_ACCOUNT.getMessage()));
    }

    @Test
    @DisplayName("???????????? ?????? ??????_??????")
    public void loginAccountDetails_Success() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/login")
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(accountId))
                .andExpect(jsonPath("$.email").value( account.getEmail()))
                .andExpect(jsonPath("$.nickname").value(account.getNickname()))
                .andExpect(jsonPath("$.profile").value(account.getProfile()))
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
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("Account ?????????"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("profile").type(JsonFieldType.STRING).description("????????? ?????????")
                                )
                        )

                ));
    }

    @Test
    @DisplayName("???????????? ?????? ??????_????????? ??????")
    public void loginAccountDetails_IllegalRequest() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));
        String illegalJwt = "Bea " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        accountRepository.delete(account);

        //when
        ResultActions removedAccount = mockMvc.perform(
                get("/accounts/login")
                        .header("Authorization", jwt)
        );
        ResultActions illegalAction = mockMvc.perform(
                get("/accounts/login")
                        .header("Authorization", illegalJwt)
        );

        //then
        removedAccount
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.NOT_FOUND_ACCOUNT.getMessage()));
        illegalAction
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.exception").value("UnAuthentication"))
                .andExpect(jsonPath("$.message").value(ExceptionCode.UN_AUTHENTICATION.getMessage()));
    }

    @Test
    @DisplayName("????????? ?????? ??????_??????")
    public void followAccountDetails_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));
        Long accountId = 10001L;
        String status = "following";

        //when
        ResultActions followingActions = mockMvc.perform(
                get("/accounts/follow/{accountId}", accountId)
                        .param("page", "1")
                        .param("size", "5")
                        .param("sort", "")
                        .param("status", status)
                        .header("Authorization", jwt)
        );
        ResultActions followerActions = mockMvc.perform(
                get("/accounts/follow/{accountId}", accountId)
                        .param("page", "1")
                        .param("size", "5")
                        .param("sort", "")
                        .param("status", "follower")
                        .header("Authorization", jwt)
        );

        //then
        followingActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(10002L))
                .andExpect(jsonPath("$.content[0].nickname").value("testNickname2"))
                .andExpect(jsonPath("$.content[0].follow").value(true))
                .andExpect(jsonPath("$.content[0].boards[0].id").value(12011L))
                .andExpect(jsonPath("$.content[0].boards[0].title").value("testTitle"))
                .andExpect(jsonPath("$.content[0].boards.size()").value(6))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(false))
                .andExpect(jsonPath("$.sorted").value(false))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.pageNumber").value(1))
                .andExpect(jsonPath("$.numberOfElements").value(5))
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
                                parameterWithName("accountId").description("Account ?????????")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("????????? ??????(default = 1)").optional(),
                                        parameterWithName("size").description("????????? ??????(default = 10)").optional(),
                                        parameterWithName("sort").description("?????? ??????(default = follow ????????????)").optional(),
                                        parameterWithName("status").description("following ?????? follower")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("Account ??????"),
                                        fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("Account ?????????"),
                                        fieldWithPath("content[].nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("content[].profile").type(JsonFieldType.STRING).description("????????? ?????????"),
                                        fieldWithPath("content[].follow").type(JsonFieldType.BOOLEAN).description("????????? ??????"),
                                        fieldWithPath("content[].boards[]").type(JsonFieldType.ARRAY).description("?????????"),
                                        fieldWithPath("content[].boards[].id").type(JsonFieldType.NUMBER).description("Board ?????????"),
                                        fieldWithPath("content[].boards[].thumbnail").type(JsonFieldType.STRING).description("Board ?????????"),
                                        fieldWithPath("content[].boards[].title").type(JsonFieldType.STRING).description("Board ??????"),
                                        fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("??? ????????? ???"),
                                        fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("?????? Question ??????"),
                                        fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("??? ????????? ??????"),
                                        fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("????????? ????????? ??????"),
                                        fieldWithPath("sorted").type(JsonFieldType.BOOLEAN).description("?????? ??????"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("????????? size"),
                                        fieldWithPath("pageNumber").type(JsonFieldType.NUMBER).description("????????? ??????(1?????? ??????)"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("???????????? Question ??????")
                                )
                        )

                ));
        followerActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(10002L))
                .andExpect(jsonPath("$.content[0].nickname").value("testNickname2"))
                .andExpect(jsonPath("$.content[0].follow").value(true))
                .andExpect(jsonPath("$.content[0].boards[0].id").value(12011L))
                .andExpect(jsonPath("$.content[0].boards[0].title").value("testTitle"))
                .andExpect(jsonPath("$.content[0].boards.size()").value(6))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(false))
                .andExpect(jsonPath("$.sorted").value(false))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.pageNumber").value(1))
                .andExpect(jsonPath("$.numberOfElements").value(5));
    }

    @Test
    @DisplayName("????????? ?????? ??????_?????? ??????")
    public void followAccountDetails_differentAccount() throws Exception {

        //given
        Account account = accountRepository.findById(10002L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));
        Long accountId = 10001L;
        String status = "following";

        //when
        ResultActions followingActions = mockMvc.perform(
                get("/accounts/follow/{accountId}", accountId)
                        .param("page", "1")
                        .param("size", "5")
                        .param("sort", "")
                        .param("status", status)
                        .header("Authorization", jwt)
        );
        ResultActions followerActions = mockMvc.perform(
                get("/accounts/follow/{accountId}", accountId)
                        .param("page", "1")
                        .param("size", "5")
                        .param("sort", "")
                        .param("status", "follower")
                        .header("Authorization", jwt)
        );

        //then
        followingActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[1].id").value(10003L))
                .andExpect(jsonPath("$.content[1].nickname").value("testNickname3"))
                .andExpect(jsonPath("$.content[1].follow").value(false))
                .andExpect(jsonPath("$.content[0].boards[0].id").value(12011L))
                .andExpect(jsonPath("$.content[0].boards[0].title").value("testTitle"))
                .andExpect(jsonPath("$.content[0].boards.size()").value(6))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(false))
                .andExpect(jsonPath("$.sorted").value(false))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.pageNumber").value(1))
                .andExpect(jsonPath("$.numberOfElements").value(5));
        followerActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(10002L))
                .andExpect(jsonPath("$.content[0].nickname").value("testNickname2"))
                .andExpect(jsonPath("$.content[0].follow").value(false))
                .andExpect(jsonPath("$.content[0].boards[0].id").value(12011L))
                .andExpect(jsonPath("$.content[0].boards[0].title").value("testTitle"))
                .andExpect(jsonPath("$.content[0].boards.size()").value(6))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(false))
                .andExpect(jsonPath("$.sorted").value(false))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.pageNumber").value(1))
                .andExpect(jsonPath("$.numberOfElements").value(5));
    }
}