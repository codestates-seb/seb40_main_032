package travelRepo.global.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import travelRepo.global.argumentresolver.LoginAccountIdArgumentResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginAccountIdArgumentResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://seb40-mainproject.s3-website.ap-northeast-2.amazonaws.com")
                .allowedMethods("*");
    }
}
