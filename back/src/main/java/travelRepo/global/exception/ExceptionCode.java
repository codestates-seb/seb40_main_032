package travelRepo.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    NOT_FOUND_ACCOUNT(404, "계정을 찾을 수 없습니다."),
    DUPLICATION_EMAIL(400, "동일한 이메일의 계정이 존재합니다."),
    IlLEGAL_PARAMETER(400, "잘못된 인자입니다."),
    SELF_FOLLOW(400, "자기 자신을 팔로 할 수 없습니다."),
    FORBIDDEN(403, "잘못된 접근입니다."),
    NOT_FOUND_BOARD(404, "게시글을 찾을 수 없습니다."),
    NOT_FOUND_COMMENT(404, "댓글을 찾을 수 없습니다."),
    UPLOAD_FAILED(500, "이미지를 업로드하는데 실패했습니다.");

    private int status;

    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
