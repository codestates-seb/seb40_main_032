package travelRepo.global.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.global.security.filter.JwtAuthenticationFilter;
import travelRepo.global.security.filter.JwtAuthorizationFilter;
import travelRepo.global.security.handler.AccountAccessDeniedHandler;
import travelRepo.global.security.handler.AccountAuthenticationEntryPoint;
import travelRepo.global.security.handler.OauthAccountSuccessHandler;
import travelRepo.global.security.jwt.JwtProcessor;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${domain.front}")
    private String frontDomain;

    private final JwtProcessor jwtProcessor;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AccountRepository accountRepository;

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
                .anyRequest().authenticated();

        http
                .addFilter(new JwtAuthenticationFilter(authenticationManager, jwtProcessor))
                .addFilterAfter(new JwtAuthorizationFilter(authenticationManager, jwtProcessor), OAuth2LoginAuthenticationFilter.class);

        http
                .exceptionHandling()
                .accessDeniedHandler(new AccountAccessDeniedHandler())
                .authenticationEntryPoint(new AccountAuthenticationEntryPoint());

        http
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OauthAccountSuccessHandler(jwtProcessor, accountRepository,
                                passwordEncoder(), frontDomain)));

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
        configuration.setAllowedOrigins(Arrays.asList("http://seb40-mainproject.s3-website.ap-northeast-2.amazonaws.com"
                ,"http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"));
        configuration.addAllowedHeader(CorsConfiguration.ALL);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
