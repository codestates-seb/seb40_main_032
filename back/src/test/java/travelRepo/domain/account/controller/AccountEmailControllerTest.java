package travelRepo.domain.account.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.dto.TempPasswordGuideSendReq;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class AccountEmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Test
    @DisplayName("임시 비밀번호 안내 메일 발송_성공")
    void TempPasswordGuideSend_Success() throws Exception {

        //given
        String email = "test1@test.com";
        TempPasswordGuideSendReq tempPasswordGuideSendReq = new TempPasswordGuideSendReq();
        tempPasswordGuideSendReq.setEmail(email);

        String content = gson.toJson(tempPasswordGuideSendReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/accounts/tempPassword/email")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "tempPasswordGuideSend",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").description("이메일")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("임시 비밀번호 안내 메일 발송_메일 전송 간격 에러")
    void TempPasswordGuideSend_MailDelay() throws Exception {

        //given
        String email = "test1@test.com";
        TempPasswordGuideSendReq tempPasswordGuideSendReq = new TempPasswordGuideSendReq();
        tempPasswordGuideSendReq.setEmail(email);

        String content = gson.toJson(tempPasswordGuideSendReq);

        //when
        mockMvc.perform(
                post("/accounts/tempPassword/email")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );
        ResultActions mailDelayEx = mockMvc.perform(
                post("/accounts/tempPassword/email")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        mailDelayEx
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.TEMP_PASSWORD_DELAY.getMessage()));

    }

    @Test
    @DisplayName("임시 비밀번호 변경_성공")
    void TempPasswordApply_Success() throws Exception {

        //given
        Long accountId = 10004L;
        String tempPassword = "qinqhzoR7ri84d";

        //when
        ResultActions actions = mockMvc.perform(
                get("/accounts/tempPassword/" + accountId + "?tempPassword=" + tempPassword)
        );

        //then
        actions
                .andExpect(status().is3xxRedirection());
    }

    @Test
    @DisplayName("임시 비밀번호 변경_메일 전송 간격 에러")
    void TempPasswordApply_MailDelay() throws Exception {

        //given
        Long accountId = 10004L;
        String tempPassword = "qinqhzoR7ri84d";

        //when
        mockMvc.perform(
                get("/accounts/tempPassword/" + accountId + "?tempPassword=" + tempPassword)
        );
        ResultActions mailDelayEx = mockMvc.perform(
                get("/accounts/tempPassword/" + accountId + "?tempPassword=" + tempPassword)
        );

        //then
        mailDelayEx
                .andExpect(status().isOk());
    }

}