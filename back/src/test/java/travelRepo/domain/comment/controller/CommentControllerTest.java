package travelRepo.domain.comment.controller;

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
import travelRepo.domain.comment.dto.CommentAddReq;
import travelRepo.domain.comment.dto.CommentModifyReq;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;

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
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("?????? ??????_??????")
    void commentAdd_Success() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 21001L;
        String commentContent = "testCommentContents";
        CommentAddReq commentAddReq = new CommentAddReq();
        commentAddReq.setBoardId(boardId);
        commentAddReq.setContent(commentContent);
        String content = gson.toJson(commentAddReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/comments")
                        .header("Authorization", jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "commentAdd",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("boardId").description("????????? ?????????"),
                                        fieldWithPath("content").description("?????? ??????")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("?????? ??????_?????? ??????")
    void commentAdd_ValidationException() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 21001L;
        String blankCommentContent = "";
        CommentAddReq commentAddReq = new CommentAddReq();
        commentAddReq.setBoardId(boardId);
        commentAddReq.setContent(blankCommentContent);
        String content = gson.toJson(commentAddReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/comments")
                        .header("Authorization", jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(MethodArgumentNotValidException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ??????????????????."));
    }

    @Test
    @DisplayName("?????? ??????_???????????? ?????? ?????????")
    void commentAdd_NOT_FOUND_BOARD() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 41001L;
        String blankCommentContent = "testCommentContents";
        CommentAddReq commentAddReq = new CommentAddReq();
        commentAddReq.setBoardId(boardId);
        commentAddReq.setContent(blankCommentContent);
        String content = gson.toJson(commentAddReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/comments")
                        .header("Authorization", jwt)
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
    @DisplayName("?????? ??????_??????")
    void commentModify_Success() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 25001L;

        String commentContent = "modified testContents";
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContent(commentContent);
        String content = gson.toJson(commentModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", commentId)
                        .header("Authorization", jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "commentModify",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        pathParameters(
                                parameterWithName("commentId").description("?????? ?????????")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("content").description("????????? ?????? ??????")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("?????? ??????_???????????? ?????? ??????")
    void commentModify_NOT_FOUND() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 45001L;

        String commentContent = "modified testContents";
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContent(commentContent);
        String content = gson.toJson(commentModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", commentId)
                        .header("Authorization", jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ?????? ??? ????????????."));
    }

    @Test
    @DisplayName("?????? ??????_????????? ??????")
    void commentModify_FORBIDDEN() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 25002L;

        String commentContent = "modified testContents";
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContent(commentContent);
        String content = gson.toJson(commentModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", commentId)
                        .header("Authorization", jwt)
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
    @DisplayName("?????? ??????_??????")
    void commentRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 35001L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/comments/{commentId}", commentId)
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "commentRemove",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        pathParameters(
                                parameterWithName("commentId").description("?????? ?????????")
                        )
                ));
    }

    @Test
    @DisplayName("?????? ??????_???????????? ?????? ??????")
    void commentRemove_NOT_FOUND() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 45001L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/comments/{commentId}", commentId)
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ?????? ??? ????????????."));
    }

    @Test
    @DisplayName("?????? ??????_????????? ??????")
    void commentRemove_FORBIDDEN() throws Exception {

        //given
        Account account = accountRepository.findById(20001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 25002L;

        //when
        ResultActions actions = mockMvc.perform(
                delete("/comments/{commentId}", commentId)
                        .header("Authorization", jwt)
        );

        //then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value("????????? ???????????????."));
    }

    @Test
    @DisplayName("?????? ??????_??????")
    void commentList_Success() throws Exception {

        //given
        Long boardId = 21001L;
        int size = 5;

        //when
        ResultActions actions = mockMvc.perform(
                get("/comments/board/{boardId}", boardId)
                        .param("size", String.valueOf(size))
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(5)))
                .andExpect(jsonPath("$.sliceNumber").value(1))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.hasNext").value("true"))
                .andExpect(jsonPath("$.numberOfElements").value(5))
                .andDo(document(
                        "commentList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("boardId").description("????????? ?????????")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("size").description("????????? ?????????").optional(),
                                        parameterWithName("lastCommentId").description("????????? ?????? Id").optional(),
                                        parameterWithName("lastCommentCreatedAt").description("????????? ?????? ?????? ??????").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content").type(JsonFieldType.ARRAY).description("?????? ??????"),
                                        fieldWithPath("content[].commentId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("content[].content").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("content[].createdAt").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("????????????"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("????????? ????????? ??????"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("?????? ????????????(?????????) ??????"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("????????????(?????????) ??????"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("?????? ????????????(?????????) ?????? ??????"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("?????? ????????????(?????????) ?????? ???")
                                )
                        )
                ));
    }
}
