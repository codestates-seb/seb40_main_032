package travelRepo.global.image.controller;

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
import org.springframework.test.web.servlet.ResultActions;import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.After;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static travelRepo.util.ApiDocumentUtils.getRequestPreProcessor;
import static travelRepo.util.ApiDocumentUtils.getResponsePreProcessor;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class ImageControllerTest extends After {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProcessor jwtProcessor;

    @Test
    @DisplayName("이미지 저장_성공")
    void ImageUpload_Success() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpeg", "image/jpeg",
                "(file data)".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpeg", "image/jpeg",
                "(file data)".getBytes());
        MockMultipartFile image3 = new MockMultipartFile("images", "image3.jpeg", "image/jpeg",
                "(file data)".getBytes());

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/image-files")
                        .file(image1)
                        .file(image2)
                        .file(image3)
                        .header("Authorization", jwt)

        );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "imageUpload",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(
                                        headerWithName("Authorization").description("JWT")
                                )
                        ),
                        requestParts(
                                List.of(
                                        partWithName("images").description("이미지")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("imagePaths").type(JsonFieldType.ARRAY).description("이미지 주소 목록")
                                )
                        )
                ));
    }
}