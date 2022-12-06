package travelRepo.global.security.jwt;

import travelRepo.global.security.authentication.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtProcessor {

    @Value("${jwt.secret-key}")
    String secretKey;

    @Value("${jwt.expiration}")
    long expiration;

    @Value("${jwt.prefix}")
    String prefix;

    @Value("${jwt.header}")
    String header;

    public String createAuthJwtToken(UserAccount userAccount) {

        Map<String, Object> claims = createClaims(userAccount);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userAccount.getAccount().getId().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    private Map<String, Object> createClaims(UserAccount userAccount) {

        Map<String, Object> claims = new HashMap<>();

        List<String> roleList = userAccount.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        claims.put("email", userAccount.getUsername());
        claims.put("role", roleList);

        return claims;
    }

    public Claims verifyJwtToken(String jwtToken) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    public String extractJwtToken(String jwtHeader) {

        int pos = jwtHeader.lastIndexOf(" ");
        return jwtHeader.substring(pos + 1);
    }

    public String getPrefix() {
        return prefix;
    }

    public String getHeader() {
        return header;
    }
}
