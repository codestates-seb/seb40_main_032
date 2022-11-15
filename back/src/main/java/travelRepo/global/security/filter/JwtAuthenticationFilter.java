package travelRepo.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import travelRepo.global.exception.dto.ErrorResponse;
import travelRepo.global.security.authentication.UserAccount;
import travelRepo.global.security.dto.LoginDto;
import travelRepo.global.security.jwt.JwtProcessor;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtProcessor jwtProcessor;


    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtProcessor jwtProcessor) {
        this.setFilterProcessesUrl("/login");
        this.authenticationManager = authenticationManager;
        this.jwtProcessor = jwtProcessor;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException, ServletException {

        UserAccount userAccount = (UserAccount) authResult.getPrincipal();

        String jwtToken = jwtProcessor.createAuthJwtToken(userAccount);
        response.addHeader(jwtProcessor.getHeader(), jwtProcessor.getPrefix() + " " + jwtToken);
        response.getWriter().write("success login");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {

        ErrorResponse authException =
                new ErrorResponse("FailToAuthentication", "인증에 실패했습니다.");

        String authExceptionJson = new Gson().toJson(authException);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(authExceptionJson);
    }
}
