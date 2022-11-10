package travelRepo.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    NOT_FOUND_ACCOUNT(400, "Account를 찾을 수 없습니다.");

    private int status;

    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
