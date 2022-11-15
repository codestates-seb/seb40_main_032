package travelRepo.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    NOT_FOUND_ACCOUNT(400, "Account를 찾을 수 없습니다."),
    DUPLICATION_EMAIL(400, "동일한 Email의 Account가 존재합니다."),
    IlLEGAL_PARAMETER(400, "잘못된 Parameter입니다.");

    private int status;

    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
