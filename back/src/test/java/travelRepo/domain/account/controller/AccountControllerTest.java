package travelRepo.domain.account.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
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
                        "addAccount",
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
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 Account Id")
                                )
                        )
                ));
    }

}