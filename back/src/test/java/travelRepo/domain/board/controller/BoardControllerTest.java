package travelRepo.domain.board.controller;

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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class BoardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("게시글 등록_성공")
    public void boardAdd_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));


        MockMultipartFile image1 = new MockMultipartFile("images", "image1.png", "image/png", "(file data)".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.png", "image/png", "(file data)".getBytes());
        MockMultipartFile image3 = new MockMultipartFile("images", "image3.png", "image/png", "(file data)".getBytes());


        String title = "mock board title";
        String content = "mock board content";
        String location = "mock board location";
        String category = "SPOT";
        String tag1 = "mock tag1";
        String tag2 = "mock tag2";
        String tag3 = "mock tag3";

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards")
                        .file(image1).file(image2).file(image3)
                        .param("title", title)
                        .param("content", content)
                        .param("location", location)
                        .param("category", category)
                        .param("tags", tag1).param("tags", tag2).param("tags", tag3)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "boardAdd",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        requestParts(
                                List.of(
                                        partWithName("images").description("사진")
                                )
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("title").description("게시글 제목"),
                                        parameterWithName("content").description("게시글 내용"),
                                        parameterWithName("location").description("위치").optional(),
                                        parameterWithName("category").description("게시글 분류"),
                                        parameterWithName("tags").description("게시글 태그").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 게시글 식별자")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("게시글 수정_성공")
    public void boardModify_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 1L;

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.png", "image/png", "(file data)".getBytes());
        MockMultipartFile image4 = new MockMultipartFile("images", "image4.png", "image/png", "(file data)".getBytes());
        MockMultipartFile image5 = new MockMultipartFile("images", "image5.png", "image/png", "(file data)".getBytes());


        String title = "modified mock board title";
        String content = "modified mock board content";
        String location = "modified mock board location";
        String category = "RESTAURANT";
        String tag4 = "mock tag4";
        String tag2 = "mock tag2";
        String tag3 = "mock tag3";

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .file(image1).file(image4).file(image5)
                        .param("title", title)
                        .param("content", content)
                        .param("location", location)
                        .param("category", category)
                        .param("tags", tag4).param("tags", tag2).param("tags", tag3)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "boardModify",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        pathParameters(
                                parameterWithName("boardId").description("게시글 식별자")
                        ),
                        requestParts(
                                List.of(
                                        partWithName("images").description("사진").optional()
                                )
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("title").description("게시글 제목").optional(),
                                        parameterWithName("content").description("게시글 내용").optional(),
                                        parameterWithName("location").description("위치").optional(),
                                        parameterWithName("category").description("게시글 분류").optional(),
                                        parameterWithName("tags").description("게시글 태그").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("수정된 게시글 식별자")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("게시글 삭제_성공")
    public void boardRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 1L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "boardRemove",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        pathParameters(
                                parameterWithName("boardId").description("게시글 식별자")
                        )
                ));
    }


    @Test
    @DisplayName("게시글 단일 조회_성공")
    public void boardDetails_Success() throws Exception {

        // given
        Long boardId = 1L;

        // when
        ResultActions actions = mockMvc.perform(
                get("/boards/{boardId}", boardId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "boardDetails",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("boardId").description("게시글 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("myBoard").type(JsonFieldType.BOOLEAN).description("로그인한 회원이 쓴 글일지 확인"),
                                        fieldWithPath("boardId").type(JsonFieldType.NUMBER).description("게시글 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("게시글 내용"),
                                        fieldWithPath("location").type(JsonFieldType.STRING).description("위치 정보"),
                                        fieldWithPath("category").type(JsonFieldType.STRING).description("게시글 분류"),
                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("좋아요 수"),
                                        fieldWithPath("views").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("게시글 태그"),
                                        fieldWithPath("photos").type(JsonFieldType.ARRAY).description("사진 주소"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("게시글 생성 날짜"),
                                        fieldWithPath("account").type(JsonFieldType.OBJECT).description("글쓴이"),
                                        fieldWithPath("account.accountId").type(JsonFieldType.NUMBER).description("계정 식별자"),
                                        fieldWithPath("account.profile").type(JsonFieldType.STRING).description("프로필 사진"),
                                        fieldWithPath("account.nickname").type(JsonFieldType.STRING).description("닉네임")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("게시글 전체 조회_성공")
    public void boardList_Success() throws Exception {

        //given
        String query = "";
        String category = "";


        //when
        ResultActions actions = mockMvc.perform(
                get("/boards")
                        .param("query", query)
                        .param("category", category)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "boardList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(
                                        parameterWithName("query").description("검색어").optional(),
                                        parameterWithName("category").description("게시글 분류").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("게시물 목록"),
                                        fieldWithPath("content[].boardId").type(JsonFieldType.NUMBER).description("게시글 식별자"),
                                        fieldWithPath("content[].thumbnail").type(JsonFieldType.STRING).description("게시글 썸네일"),
                                        fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("content[].likeCount").type(JsonFieldType.NUMBER).description("게시글 좋아요 수"),
                                        fieldWithPath("content[].tags").type(JsonFieldType.ARRAY).description("게시글 태그"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("글쓴이"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("계정 식별자"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("프로필 사진"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("현재 슬라이스 번호"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("슬라이스 사이즈"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("다음 슬라이스 존재 여부"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 슬라이스의 게시글 수")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("유저 게시글 조회_성공")
    public void accountBoardList_Success() throws Exception {

        //given
        Long accountId = 1L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/boards/account/{accountId}", accountId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "accountBoardList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("accountId").description("계정 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("게시물 목록"),
                                        fieldWithPath("content[].boardId").type(JsonFieldType.NUMBER).description("게시글 식별자"),
                                        fieldWithPath("content[].thumbnail").type(JsonFieldType.STRING).description("게시글 썸네일"),
                                        fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("content[].likeCount").type(JsonFieldType.NUMBER).description("게시글 좋아요 수"),
                                        fieldWithPath("content[].tags").type(JsonFieldType.ARRAY).description("게시글 태그"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("글쓴이"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("계정 식별자"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("프로필 사진"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("현재 슬라이스 번호"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("슬라이스 사이즈"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("다음 슬라이스 존재 여부"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 슬라이스의 게시글 수")
                                )
                        )
                ));
    }
}