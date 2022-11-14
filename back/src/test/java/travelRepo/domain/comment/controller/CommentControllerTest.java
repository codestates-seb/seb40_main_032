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
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.comment.dto.CommentAddReq;
import travelRepo.domain.comment.dto.CommentModifyReq;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

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
    @DisplayName("댓글 등록_성공")
    void commentAdd_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long boardId = 1L;
        String commentContent = "mock board content";
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
                                        fieldWithPath("boardId").description("게시글 식별자"),
                                        fieldWithPath("content").description("댓글 내용")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("댓글 수정_성공")
    void commentModify_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 1l;

        String commentContent = "modified mock board content";
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
                                parameterWithName("commentId").description("댓글 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("content").description("수정된 댓글 내용")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("댓글 삭제_성공")
    void commentRemove_Success() throws Exception {

        //given
        Account account = accountRepository.findById(10001L).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        Long commentId = 1l;

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
                                parameterWithName("commentId").description("댓글 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("댓글 조회_성공")
    void commentList_Success() throws Exception {

        //given
        Long boardId = 1l;

        //when
        ResultActions actions = mockMvc.perform(
                get("/comments/board/{boardId}", boardId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "commentList",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("boardId").description("게시글 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("content").type(JsonFieldType.ARRAY).description("댓글 목록"),
                                        fieldWithPath("content[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("content[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("content[].createdAt").type(JsonFieldType.STRING).description("댓글 작성 시간"),
                                        fieldWithPath("content[].account").type(JsonFieldType.OBJECT).description("댓글쓴이"),
                                        fieldWithPath("content[].account.accountId").type(JsonFieldType.NUMBER).description("계정 식별자"),
                                        fieldWithPath("content[].account.profile").type(JsonFieldType.STRING).description("프로필 이미지 주소"),
                                        fieldWithPath("content[].account.nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("sliceNumber").type(JsonFieldType.NUMBER).description("현재 슬라이스(페이지) 번호"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("슬라이스(페이지) 크기"),
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("다음 슬라이스(페이지) 존재 여부"),
                                        fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("현재 슬라이스(페이지) 댓글 수")
                                )
                        )
                ));
    }
}