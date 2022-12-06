package travelRepo.global.security.filter;

import travelRepo.global.security.authentication.Principal;
import travelRepo.global.security.jwt.JwtProcessor;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final JwtProcessor jwtProcessor;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtProcessor jwtProcessor) {
        super(authenticationManager);
        this.jwtProcessor = jwtProcessor;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String jwtHeader = request.getHeader(jwtProcessor.getHeader());

        if (jwtHeader == null || !jwtHeader.startsWith(jwtProcessor.getPrefix())) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = jwtProcessor.extractJwtToken(jwtHeader);
        Claims claims = jwtProcessor.verifyJwtToken(jwtToken);

        Long id = Long.valueOf(claims.getSubject());
        String email = (String) claims.get("email");

        List<String> roleList = (List<String>) claims.get("role");
        List<SimpleGrantedAuthority> authorities = roleList.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        Principal principal = new Principal(id, email);

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(principal, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
}
