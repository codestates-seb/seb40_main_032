package travelRepo.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    NOT_FOUND_ACCOUNT(404, "계정을 찾을 수 없습니다.", "001"),
    DUPLICATION_EMAIL(400, "동일한 이메일의 계정이 존재합니다.", "002"),
    IlLEGAL_PARAMETER(400, "잘못된 인자입니다.", "003"),
    SELF_FOLLOW(400,  "자기 자신을 팔로 할 수 없습니다.", "004"),
    FORBIDDEN(403, "잘못된 접근입니다.", "005"),
    NOT_FOUND_BOARD(404, "게시글을 찾을 수 없습니다.", "006"),
    NOT_FOUND_COMMENT(404, "댓글을 찾을 수 없습니다.", "007"),
    UPLOAD_FAILED(500, "이미지를 업로드하는데 실패했습니다.", "008"),
    MAIL_SEND_FAILED(500, "이메일 전송이 실패했습니다.", "009"),
    TEMP_PASSWORD_DELAY(400, "임시 비밀번호 발급은 1시간에 한번 가능합니다.", "010"),
    DUPLICATION_NICKNAME(400, "동일한 닉네임의 계정이 존재합니다.", "011");

    private int status;

    private String message;

    private String code;

    ExceptionCode(int status, String message, String code) {
        this.status = status;
        this.message = message;
        this.code = code;
    }
}
