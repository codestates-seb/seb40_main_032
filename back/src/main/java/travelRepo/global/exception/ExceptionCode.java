package travelRepo.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    GLOBAL_EXCEPTION(400, "잘못된 요청입니다.", "000"),
    BIND_EXCEPTION(400, "잘못된 입력값입니다.", "001"),
    FAIL_AUTHENTICATION(401, "인증에 실패했습니다.", "002"),
    UN_AUTHENTICATION(401, "인증되지 않았습니다.", "003"),
    NOT_FOUND_ACCOUNT(404, "계정을 찾을 수 없습니다.", "004"),
    DUPLICATION_EMAIL(400, "동일한 이메일의 계정이 존재합니다.", "005"),
    IlLEGAL_PARAMETER(400, "잘못된 인자입니다.", "006"),
    SELF_FOLLOW(400,  "자기 자신을 팔로 할 수 없습니다.", "007"),
    FORBIDDEN(403, "잘못된 접근입니다.", "008"),
    NOT_FOUND_BOARD(404, "게시글을 찾을 수 없습니다.", "009"),
    NOT_FOUND_COMMENT(404, "댓글을 찾을 수 없습니다.", "010"),
    UPLOAD_FAILED(500, "이미지를 업로드하는데 실패했습니다.", "011"),
    MAIL_SEND_FAILED(500, "이메일 전송이 실패했습니다.", "012"),
    TEMP_PASSWORD_DELAY(400, "임시 비밀번호 발급은 1시간에 한번 가능합니다.", "013"),
    DUPLICATION_NICKNAME(400, "동일한 닉네임의 계정이 존재합니다.", "014"),
    EMPTY_FILE(400, "파일이 비어있습니다.", "015"),
    ILLEGAL_FILENAME(400, "잘못된 형식의 파일 이름입니다.", "016"),
    FAIL_REMOVE_ACCOUNT(400, "회원을 삭제 할 수 없습니다.", "017");

    private int status;

    private String message;

    private String code;

    ExceptionCode(int status, String message, String code) {
        this.status = status;
        this.message = message;
        this.code = code;
    }
}
