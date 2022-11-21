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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.BoardAddReq;
import travelRepo.domain.board.dto.BoardModifyReq;
import travelRepo.domain.board.entity.Category;
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
class BoardControllerTest extends After {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private Gson gson;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("게시글 등록_성공")
    public void boardAdd_Success() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        BoardAddReq boardAddReq = new BoardAddReq();
        boardAddReq.setTitle("board title");
        boardAddReq.setContent("board content");
        boardAddReq.setLocation("board location");
        boardAddReq.setCategory(Category.STAY);
        boardAddReq.setTags(List.of("tag1", "tag2", "tag3"));
        boardAddReq.setImages(List.of("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"));
        String content = gson.toJson(boardAddReq);

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
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
                        requestFields(
                                List.of(
                                        fieldWithPath("title").description("게시글 제목"),
                                        fieldWithPath("content").description("게시글 내용"),
                                        fieldWithPath("location").description("위치").optional(),
                                        fieldWithPath("category").description("게시글 분류"),
                                        fieldWithPath("tags").description("게시글 태그").optional(),
                                        fieldWithPath("images").description("사진")
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
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        BoardAddReq boardAddReq1 = new BoardAddReq();
        boardAddReq1.setTitle("title is too loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong");
        boardAddReq1.setContent("board content");
        boardAddReq1.setLocation("board location");
        boardAddReq1.setCategory(Category.SPOT);
        boardAddReq1.setTags(List.of("tag1", "tag2", "tag3"));
        boardAddReq1.setImages(List.of("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"));
        String content1 = gson.toJson(boardAddReq1);

        BoardAddReq boardAddReq2 = new BoardAddReq();
        boardAddReq2.setTitle("board title");
        boardAddReq2.setContent("ctt");
        boardAddReq2.setLocation("board location");
        boardAddReq2.setCategory(Category.SPOT);
        boardAddReq2.setTags(List.of("tag1", "tag2", "tag3"));
        boardAddReq2.setImages(List.of("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"));
        String content2 = gson.toJson(boardAddReq2);

        BoardAddReq boardAddReq3 = new BoardAddReq();
        boardAddReq3.setTitle("board title");
        boardAddReq3.setContent("board content");
        boardAddReq3.setLocation("board location");
        boardAddReq3.setTags(List.of("tag1", "tag2", "tag3"));
        boardAddReq3.setImages(List.of("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"));
        String content3 = gson.toJson(boardAddReq3);

        //when
        ResultActions titleValidationEx = mockMvc.perform(
                multipart("/boards")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content1)
        );
        ResultActions contentValidationEx = mockMvc.perform(
                multipart("/boards")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content2)
        );
        ResultActions notEnoughParameterEx = mockMvc.perform(
                multipart("/boards")
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content3)
        );
        //then
        titleValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        contentValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
        notEnoughParameterEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."));
    }

    @Test
    @DisplayName("게시글 수정_성공")
    public void boardModify_Success() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 31001L;

        BoardModifyReq boardModifyReq = new BoardModifyReq();
        boardModifyReq.setTitle("modified board title");
        boardModifyReq.setContent("modified board content");
        boardModifyReq.setLocation("modified board location");
        boardModifyReq.setCategory(Category.RESTAURANT);
        boardModifyReq.setTags(List.of("tag3", "tag2", "tag1"));
        boardModifyReq.setImages(List.of("https://main-image-repo.s3.ap-northeast-2.amazonaws.com/39c10d6d-2765-479d-a45f-662e619fd006.jpeg"));
        String content = gson.toJson(boardModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
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
                        requestFields(
                                List.of(
                                        fieldWithPath("title").description("수정된 게시글 제목").optional(),
                                        fieldWithPath("content").description("수정된 게시글 내용").optional(),
                                        fieldWithPath("location").description("수정된 위치").optional(),
                                        fieldWithPath("category").description("수정된 게시글 분류").optional(),
                                        fieldWithPath("tags").description("수정된 게시글 태그").optional(),
                                        fieldWithPath("images").description("수정된 사진").optional()
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
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 41001L;

        BoardModifyReq boardModifyReq = new BoardModifyReq();
        boardModifyReq.setTitle("modified board title");
        String content = gson.toJson(boardModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
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
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 21002L;

        BoardModifyReq boardModifyReq = new BoardModifyReq();
        boardModifyReq.setTitle("modified board title");
        String content = gson.toJson(boardModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/boards/{boardId}", boardId)
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
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
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 31002L;

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
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 41001L;

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
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 21002L;

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
        Long boardId = 21001L;

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
                .andExpect(jsonPath("$.views").value(102))
                .andExpect(jsonPath("$.tags", hasSize(2)))
                .andExpect(jsonPath("$.photos", hasSize(1)))
                .andExpect(jsonPath("$.createdAt").value("2022-11-14T12:00:01"))
                .andExpect(jsonPath("$.account.accountId").value(20001))
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
        Long boardId = 41001L;

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
        String query = null;
        String category = null;
        int page = 1;
        int size = 20;
        String sort = "createdAt,DESC";

        //when
        ResultActions actions = mockMvc.perform(
                get("/boards")
                        .param("query", query)
                        .param("category", category)
                        .param("page", String.valueOf(page))
                        .param("size", String.valueOf(size))
                        .param("sort", sort)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.hasNext").value(true))
                .andExpect(jsonPath("$.numberOfElements").value(20))
                .andDo(document(
                        "boardList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(
                                        parameterWithName("query").description("검색어").optional(),
                                        parameterWithName("category").description("게시글 분류").optional(),
                                        parameterWithName("page").description("페이지").optional(),
                                        parameterWithName("size").description("페이지 사이즈").optional(),
                                        parameterWithName("sort").description("정렬 기준").optional()
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
    @DisplayName("게시글 전체 조회_검색")
    public void boardList_Search() throws Exception {

        //given
        String query = "Query";

        //when
        ResultActions actions = mockMvc.perform(
                get("/boards")
                        .param("query", query)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.hasNext").value(false))
                .andExpect(jsonPath("$.numberOfElements").value(15));
    }

    @Test
    @DisplayName("게시글 전체 조회_필터")
    public void boardList_Filter() throws Exception {

        //given
        Category category = Category.SPOT;

        //when
        ResultActions actions = mockMvc.perform(
                get("/boards")
                        .param("category", "SPOT")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.hasNext").value(false))
                .andExpect(jsonPath("$.numberOfElements").value(7));
    }

    @Test
    @DisplayName("유저 게시글 조회_성공")
    public void accountBoardList_Success() throws Exception {

        //given
        Long accountId = 20002L;

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