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
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.jwt.JwtProcessor;
import travelRepo.util.Treatment;

import java.net.BindException;
import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
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
class ImageControllerTest extends Treatment {

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

        MockMultipartFile image1 = new MockMultipartFile("images", "이것은 이미지 파일 입니다..jpeg", "image/jpeg",
                "(file data)".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "abcd1234.가나다ㄱㄴㅏㅗ!@#$[]:;'=+-_(){}.jpg", "image/jpg",
                "(file data)".getBytes());
        MockMultipartFile image3 = new MockMultipartFile("images", "this1. is2. image3.png", "image/png",
                "(file data)".getBytes());

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/image-files")
                        .file(image1)
                        .file(image2)
                        .file(image3)
                        .header("Authorization", jwt));

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

    @Test
    @DisplayName("이미지 저장_비어있는 요청")
    void ImageUpload_EmptyRequest() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/image-files")
                        .header("Authorization", jwt));

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BindException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.BIND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("이미지 저장_잘못된 파일 형식")
    void ImageUpload_IllegalFile() throws Exception {

        //given
        Long accountId = 10001L;
        Account account = accountRepository.findById(accountId).get();
        String jwt = "Bearer " + jwtProcessor.createAuthJwtToken(new UserAccount(account));

        MockMultipartFile emptyFile = new MockMultipartFile("images", "image3.png", "image/png",
                "".getBytes());
        MockMultipartFile illegalFilename = new MockMultipartFile("images", "image1.gif", "image/jpeg",
                "(file data)".getBytes());
        MockMultipartFile emptyFilename = new MockMultipartFile("images", "", "image/jpg",
                "(file data)".getBytes());
        MockMultipartFile blankFilename = new MockMultipartFile("images", "  .jpg", "image/png",
                "(file data)".getBytes());
        MockMultipartFile blankOriginalFilename = new MockMultipartFile("images", "   ", "image/png",
                "(file data)".getBytes());

        //when
        ResultActions emptyFileAction = mockMvc.perform(
                multipart("/image-files")
                        .file(emptyFile)
                        .header("Authorization", jwt));
        ResultActions illegalFilenameAction = mockMvc.perform(
                multipart("/image-files")
                        .file(illegalFilename)
                        .header("Authorization", jwt));
        ResultActions emptyFilenameAction = mockMvc.perform(
                multipart("/image-files")
                        .file(emptyFilename)
                        .header("Authorization", jwt));
        ResultActions blankFilenameAction = mockMvc.perform(
                multipart("/image-files")
                        .file(blankFilename)
                        .header("Authorization", jwt));
        ResultActions blankOriginalFilenameAction = mockMvc.perform(
                multipart("/image-files")
                        .file(blankOriginalFilename)
                        .header("Authorization", jwt));

        //then
        emptyFileAction
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.EMPTY_FILE.getMessage()));
        illegalFilenameAction
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.ILLEGAL_FILENAME.getMessage()));
        emptyFilenameAction
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.ILLEGAL_FILENAME.getMessage()));
        blankFilenameAction
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.ILLEGAL_FILENAME.getMessage()));
        blankOriginalFilenameAction
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.exception").value(BusinessLogicException.class.getSimpleName()))
                .andExpect(jsonPath("$.message").value(ExceptionCode.ILLEGAL_FILENAME.getMessage()));
    }
}