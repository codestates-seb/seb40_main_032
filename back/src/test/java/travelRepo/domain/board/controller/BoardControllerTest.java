package travelRepo.domain.board.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.BoardAddReq;
import travelRepo.domain.board.dto.BoardModifyReq;
import travelRepo.domain.board.entity.Category;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.Treatment;

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
class BoardControllerTest extends Treatment {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private Gson gson;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("????????? ??????_??????")
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
        boardAddReq.setImages(List.of("test.jpeg"));
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
                                        fieldWithPath("title").description("????????? ??????"),
                                        fieldWithPath("content").description("????????? ??????"),
                                        fieldWithPath("location").description("??????").optional(),
                                        fieldWithPath("category").description("????????? ??????"),
                                        fieldWithPath("tags").description("????????? ??????").optional(),
                                        fieldWithPath("images").description("??????")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("????????? ????????? ?????????")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("????????? ??????_?????? ??????")
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
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
        contentValidationEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
        notEnoughParameterEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
    }

    @Test
    @DisplayName("????????? ??????_??????")
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
        boardModifyReq.setImages(List.of("test.jpeg"));
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
                                parameterWithName("boardId").description("????????? ?????????")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").description("????????? ????????? ??????").optional(),
                                        fieldWithPath("content").description("????????? ????????? ??????").optional(),
                                        fieldWithPath("location").description("????????? ??????").optional(),
                                        fieldWithPath("category").description("????????? ????????? ??????").optional(),
                                        fieldWithPath("tags").description("????????? ????????? ??????").optional(),
                                        fieldWithPath("images").description("????????? ??????").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("????????? ????????? ?????????")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("????????? ??????_???????????? ?????? ?????????")
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
                .andExpect(jsonPath("$.message").value("???????????? ?????? ??? ????????????."));
    }

    @Test
    @DisplayName("????????? ??????_????????? ??????")
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
                .andExpect(jsonPath("$.message").value("????????? ???????????????."));
    }

    @Test
    @DisplayName("????????? ??????_??????")
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
                                parameterWithName("boardId").description("????????? ?????????")
                        )
                ));
    }

    @Test
    @DisplayName("????????? ??????_???????????? ?????? ?????????")
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
                .andExpect(jsonPath("$.message").value("???????????? ?????? ??? ????????????."));
    }

    @Test
    @DisplayName("????????? ??????_????????? ??????")
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
                .andExpect(jsonPath("$.message").value("????????? ???????????????."));
    }

    @Test
    @DisplayName("????????? ?????? ??????_??????")
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
                .andExpect(jsonPath("$.category").value("??????"))
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
                                parameterWithName("boardId").description("????????? ?????????")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("boardId").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("location").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("category").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("????????? ???"),
                                        fieldWithPath("views").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("photos").type(JsonFieldType.ARRAY).description("?????? ??????"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("????????? ?????? ??????"),
                                        fieldWithPath("account").type(JsonFieldType.OBJECT).description("?????????"),
                                        fieldWithPath("account.accountId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("account.profile").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("account.nickname").type(JsonFieldType.STRING).description("?????????")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("????????? ?????? ??????_???????????? ?????? ?????????")
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
                .andExpect(jsonPath("$.message").value("???????????? ?????? ??? ????????????."));
    }

    @Test
    @DisplayName("????????? ?????? ??????_??????")
    public void boardList_Success() throws Exception {

        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/boards")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.hasNext").value(true))
                .andExpect(jsonPath("$.numberOfElements").value(20))
                .andExpect(jsonPath("$.content[0].commentCount").value(3))
                .andDo(document(
                        "boardList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(
                                        parameterWithName("query").description("?????????").optional(),
                                        parameterWithName("category").description("????????? ??????").optional(),
                                        parameterWithName("size").description("????????? ?????????").optional(),
                                        parameterWithName("sort").description("?????? ??????").optional(),
                                        parameterWithName("lastBoardId").description("????????? ????????? Id").optional(),
                                        parameterWithName("lastBoardCreatedAt").description("????????? ????????? ?????? ??????").optional(),
                                        parameterWithName("lastBoardViews").description("????????? ????????? ?????????").optional(),
                                        parameterWithName("lastBoardLikeCount").description("????????? ????????? ?????????").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("content[].boardId").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("content[].thumbnail").type(JsonFieldType.STRING).description("????????? ?????????"),
                                        fieldWithPath("content[].title").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].likeCount").type(JsonFieldType.NUMBER).description("????????? ????????? ???"),
                                        fieldWithPath("content[].commentCount").type(JsonFieldType.NUMBER).description("?????? ???"),
                                        fieldWithPath("content[].views").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("content[].createdAt").type(JsonFieldType.STRING).description("????????? ?????? ??????"),
                                        fieldWithPath("content[].tags").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("?????????"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("?????? ???????????? ??????"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("?????? ???????????? ?????? ??????"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("?????? ??????????????? ????????? ???")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("????????? ?????? ??????_??????")
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
    @DisplayName("????????? ?????? ??????_??????")
    public void boardList_Filter() throws Exception {

        //given

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
    @DisplayName("?????? ????????? ??????_??????")
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
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.hasNext").value(false))
                .andExpect(jsonPath("$.numberOfElements").value(7))
                .andExpect(jsonPath("$.content[0].commentCount").value(4))
                .andDo(document(
                        "accountBoardList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("accountId").description("?????? ?????????")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("lastBoardId").description("????????? ????????? Id").optional(),
                                        parameterWithName("lastBoardCreatedAt").description("????????? ????????? ?????? ??????").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("content[].boardId").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("content[].thumbnail").type(JsonFieldType.STRING).description("????????? ?????????"),
                                        fieldWithPath("content[].title").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].likeCount").type(JsonFieldType.NUMBER).description("????????? ????????? ???"),
                                        fieldWithPath("content[].commentCount").type(JsonFieldType.NUMBER).description("?????? ???"),
                                        fieldWithPath("content[].views").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("content[].createdAt").type(JsonFieldType.STRING).description("????????? ?????? ??????"),
                                        fieldWithPath("content[].tags").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("?????????"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("?????? ???????????? ??????"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("?????? ???????????? ?????? ??????"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("?????? ??????????????? ????????? ???")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("???????????? ????????? ??????_??????")
    public void likeBoardList_Success() throws Exception {

        //given
        Long accountId = 20001L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/boards/like/account/{accountId}", accountId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.hasNext").value(false))
                .andExpect(jsonPath("$.numberOfElements").value(7))
                .andExpect(jsonPath("$.content[0].commentCount").value(2))
                .andDo(document(
                        "likeBoardList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("accountId").description("?????? ?????????")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("lastLikeId").description("????????? ???????????? likeId").optional(),
                                        parameterWithName("lastLikeCreatedAt").description("????????? ???????????? like ??????").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content[]").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("content[].boardId").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("content[].thumbnail").type(JsonFieldType.STRING).description("????????? ?????????"),
                                        fieldWithPath("content[].title").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].likeCount").type(JsonFieldType.NUMBER).description("????????? ????????? ???"),
                                        fieldWithPath("content[].views").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                        fieldWithPath("content[].commentCount").type(JsonFieldType.NUMBER).description("?????? ???"),
                                        fieldWithPath("content[].tags").type(JsonFieldType.ARRAY).description("????????? ??????"),
                                        fieldWithPath("content[].likeId").type(JsonFieldType.NUMBER).description("????????? Id"),
                                        fieldWithPath("content[].likeCreatedAt").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("?????????"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("????????? ??????"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("?????? ???????????? ??????"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("?????? ???????????? ?????? ??????"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("?????? ??????????????? ????????? ???")
                                )
                        )
                ));
    }
}