package travelRepo.global.config;

import com.p6spy.engine.spy.P6SpyOptions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import travelRepo.global.aop.logtracer.LogTrace;
import travelRepo.global.aop.logtracer.LogTraceAspect;
import travelRepo.global.p6spy.P6spySqlFormatConfiguration;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
    @ConditionalOnProperty(value = "logTracer", havingValue = "true")
    public LogTraceAspect logTraceAspect() {
        return new LogTraceAspect(logTrace);
    }

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }
}
