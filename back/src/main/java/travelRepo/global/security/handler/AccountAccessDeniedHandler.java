package travelRepo.global.security.handler;

import com.google.gson.Gson;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.exception.dto.ErrorResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AccountAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {

        ExceptionCode forbidden = ExceptionCode.FORBIDDEN;
        ErrorResponse accessException =
                new ErrorResponse("Forbidden", forbidden.getMessage(), forbidden.getCode());

        String authenticationExJson = new Gson().toJson(accessException);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(authenticationExJson);
    }
}
