package travelRepo.global.config;

import com.p6spy.engine.spy.P6SpyOptions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import travelRepo.global.aop.logtracer.LogTrace;
import travelRepo.global.aop.logtracer.LogTraceAspect;
import travelRepo.global.p6spy.P6spySqlFormatConfiguration;
import travelRepo.global.security.authentication.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final LogTrace logTrace;

    @PersistenceContext
    public EntityManager entityManager;

    @PostConstruct
    public void setLogMessageFormat() {
        P6SpyOptions.getActiveInstance().setLogMessageFormat(P6spySqlFormatConfiguration.class.getName());
    }

    @Bean
    public AuditorAware<String> auditorProvider() {

        return new AuditorAware<String>() {

            @Override
            public Optional<String> getCurrentAuditor() {

                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    return Optional.of("nonAuthentication");
                }

                Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

                if (principal == "anonymousUser") {
                    return Optional.of(principal.toString());
                }

                return Optional.of(((Principal) principal).getEmail());
            }
        };
    }

    @Bean
    @ConditionalOnProperty(value = "logTracer", havingValue = "true")
    public LogTraceAspect logTraceAspect() {
        return new LogTraceAspect(logTrace);
    }

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }

}
