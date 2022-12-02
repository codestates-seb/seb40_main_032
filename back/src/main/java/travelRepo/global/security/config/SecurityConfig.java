package travelRepo.global.security.config;

import travelRepo.global.security.handler.AccountAccessDeniedHandler;
import travelRepo.global.security.handler.AccountAuthenticationEntryPoint;
import travelRepo.global.security.filter.JwtAuthenticationFilter;
import travelRepo.global.security.filter.JwtAuthorizationFilter;
import travelRepo.global.security.jwt.JwtProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.*;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProcessor jwtProcessor;
    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();

        http
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/accounts/login").authenticated()
                .mvcMatchers(HttpMethod.GET, "/docs/index.html").permitAll()
                .mvcMatchers(HttpMethod.GET, "/accounts/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/boards/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/comments/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/image-files/**").permitAll()
                .mvcMatchers(HttpMethod.POST, "/accounts/tempPassword/**").permitAll()
                .mvcMatchers(HttpMethod.POST, "/accounts").permitAll()
                .anyRequest().authenticated();

        http
                .addFilter(new JwtAuthenticationFilter(authenticationManager, jwtProcessor))
                .addFilter(new JwtAuthorizationFilter(authenticationManager, jwtProcessor));

        http
                .exceptionHandling()
                .accessDeniedHandler(new AccountAccessDeniedHandler())
                .authenticationEntryPoint(new AccountAuthenticationEntryPoint());

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityConfig() {
        return (web -> web
                .ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()));
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://seb40-mainproject.s3-website.ap-northeast-2.amazonaws.com"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
