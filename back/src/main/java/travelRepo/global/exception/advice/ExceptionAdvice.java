package travelRepo.global.exception.advice;

import org.springframework.validation.BindException;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Component
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> basicExceptionHandler(Exception e) {

        ErrorResponse errorResponse = new ErrorResponse(e.getClass().getSimpleName(), e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> businessLoginExceptionHandler(BusinessLogicException e) {

        ErrorResponse errorResponse = new ErrorResponse(e.getClass().getSimpleName(), e.getExceptionCode().getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> bindExceptionHandler(BindException e) {

        ErrorResponse errorResponse = new ErrorResponse(e.getClass().getSimpleName(), "잘못된 입력값입니다.");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
