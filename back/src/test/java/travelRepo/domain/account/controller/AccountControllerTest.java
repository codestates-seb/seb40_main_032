package travelRepo.domain.account.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;

import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("회원 생성_성공")
    public void accountAdd_Success() throws Exception {

        //given
        String email = "test@test.com";
        String password = "123456";
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
    @DisplayName("회원 수정_성공")
    public void accountModify_Success() throws Exception {

        //given
        Long accountId = 1L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        String password = "123456";
        String nickname = "testNickname";
        MockMultipartFile profile = new MockMultipartFile("profile", "profile.jpeg", "image/jpeg",
                "(file data)".getBytes());

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/accounts/{accountId}", accountId)
                        .file(profile)
                        .header("Authorization", jwt)
                        .param("password", password)
                        .param("nickname", nickname)
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
                        pathParameters(
                                parameterWithName("accountId").description("Account 식별자")
                        ),
                        requestParts(
                                List.of(
                                        partWithName("profile").description("프로필 이미지")
                                )
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("password").description("비밀 번호"),
                                        parameterWithName("nickname").description("닉네임")
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
    @DisplayName("회원 삭제_성공")
    public void accountRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(1L).get();
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
        Long accountId = 2L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/{accountId}", accountId)
        );

        //then
        actions
                .andExpect(status().isOk())
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
        Account account = accountRepository.findById(1L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/login")
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isOk())
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
                                        fieldWithPath("profile").type(JsonFieldType.STRING).description("프로필 이미지"),
                                        fieldWithPath("following").type(JsonFieldType.NUMBER).description("팔로잉 수"),
                                        fieldWithPath("follower").type(JsonFieldType.NUMBER).description("팔로워 수")
                                )
                        )

                ));
    }

    @Test
    @DisplayName("팔로우 회원 조회_성공")
    public void followAccountDetails_Success() throws Exception {

        //given
        Account account = accountRepository.findById(1L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));
        Long accountId = 2L;
        String status = "following";

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/follow/{accountId}", accountId)
                        .param("page", "2")
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
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        pathParameters(
                                parameterWithName("accountId").description("Account 식별자")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("페이지 번호(default = 1)"),
                                        parameterWithName("size").description("페이징 크기(default = 10)"),
                                        parameterWithName("sort").description("정렬 조건(default = asc)"),
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
                                        fieldWithPath("pageNumber").type(JsonFieldType.NUMBER).description("페이지 번호(0부터 시작)"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("페이징된 Question 개수")
                                )
                        )

                ));
    }

}