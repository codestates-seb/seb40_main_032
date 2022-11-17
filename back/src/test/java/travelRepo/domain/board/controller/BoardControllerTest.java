package travelRepo.domain.board.controller;

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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.After;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class BoardControllerTest extends After {

    @Autowired
    private MockMvc mockMvc;

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


        String title = "board title";
        String content = "board content";
        String location = "board location";
        String category = "SPOT";
        String tag1 = "tag1";
        String tag2 = "tag2";
        String tag3 = "tag3";

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
    @DisplayName("게시글 등록_검증 실패")
    public void boardAdd_ValidationException() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.png", "image/png", "(file data)".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.png", "image/png", "(file data)".getBytes());
        MockMultipartFile image3 = new MockMultipartFile("images", "image3.png", "image/png", "(file data)".getBytes());


        String title = "board title";
        String content = "board content";
        String tooLongTitle = "title is too loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong";
        String tooShortContent = "ctt";
        String location = "board location";
        String category = "SPOT";
        String tag1 = "tag1";
        String tag2 = "tag2";
        String tag3 = "tag3";

        //when
        ResultActions titleValidationEx = mockMvc.perform(
                multipart("/boards")
                        .file(image1).file(image2).file(image3)
                        .param("title", tooLongTitle)
                        .param("content", content)
                        .param("location", location)
                        .param("category", category)
                        .param("tags", tag1).param("tags", tag2).param("tags", tag3)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );
        ResultActions contentValidationEx = mockMvc.perform(
                multipart("/boards")
                        .file(image1).file(image2).file(image3)
                        .param("title", title)
                        .param("content", tooShortContent)
                        .param("location", location)
                        .param("category", category)
                        .param("tags", tag1).param("tags", tag2).param("tags", tag3)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );
        ResultActions categoryValidationEx = mockMvc.perform(
                multipart("/boards")
                        .file(image1).file(image2).file(image3)
                        .param("title", tooLongTitle)
                        .param("content", content)
                        .param("location", location)
                        .param("tags", tag1).param("tags", tag2).param("tags", tag3)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );
        ResultActions imageValidationEx = mockMvc.perform(
                multipart("/boards")
                        .param("title", tooLongTitle)
                        .param("content", content)
                        .param("location", location)
                        .param("category", category)
                        .param("tags", tag1).param("tags", tag2).param("tags", tag3)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        //then
        titleValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        contentValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        categoryValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        imageValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
    }

    @Test
    @DisplayName("게시글 수정_성공")
    public void boardModify_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12001L;

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
    @DisplayName("게시글 수정_존재하지 않는 게시글")
    public void boardModify_NOT_FOUND() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12101L;

        String title = "modified mock board title";

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .param("title", title)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("게시글을 찾을 수 없습니다."));
    }

    @Test
    @DisplayName("게시글 수정_잘못된 접근")
    public void boardModify_FORBIDDEN() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12002L;

        String title = "modified mock board title";

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .param("title", title)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        //then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 접근입니다."));
    }

    @Test
    @DisplayName("게시글 삭제_성공")
    public void boardRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12004L;

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
    @DisplayName("게시글 삭제_존재하지 않는 게시글")
    public void boardRemove_NOT_FOUND() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12101L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
        );

        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("게시글을 찾을 수 없습니다."));
    }

    @Test
    @DisplayName("게시글 삭제_잘못된 접근")
    public void boardRemove_FORBIDDEN() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 12002L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
        );

        // then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 접근입니다."));
    }

    @Test
    @DisplayName("게시글 단일 조회_성공")
    public void boardDetails_Success() throws Exception {

        // given
        Long boardId = 12001L;

        // when
        ResultActions actions = mockMvc.perform(
                get("/boards/{boardId}", boardId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.boardId").value(boardId))
                .andExpect(jsonPath("$.title").value("testTitle"))
                .andExpect(jsonPath("$.content").value("testContents"))
                .andExpect(jsonPath("$.location").value("test-location"))
                .andExpect(jsonPath("$.category").value("RESTAURANT"))
                .andExpect(jsonPath("$.likeCount").value(1))
                .andExpect(jsonPath("$.views").value(11))
                .andExpect(jsonPath("$.tags", hasSize(2)))
                .andExpect(jsonPath("$.photos", hasSize(3)))
                .andExpect(jsonPath("$.createdAt").value("2022-10-14T12:00:01"))
                .andExpect(jsonPath("$.account.accountId").value(10001))
                .andDo(document(
                        "boardDetails",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("boardId").description("게시글 식별자")
                        ),
                        responseFields(
                                List.of(
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
    @DisplayName("게시글 단일 조회_존재하지 않는 게시글")
    public void boardDetails_NOT_FOUND() throws Exception {

        // given
        Long boardId = 12101L;

        // when
        ResultActions actions = mockMvc.perform(
                get("/boards/{boardId}", boardId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("게시글을 찾을 수 없습니다."));
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
        Long accountId = 10001L;

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