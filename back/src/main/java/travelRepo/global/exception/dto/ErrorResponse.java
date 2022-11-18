package travelRepo.global.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {

    private String exception;

    private String message;

    private String code;
}
