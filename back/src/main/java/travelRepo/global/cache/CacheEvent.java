package travelRepo.global.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class CacheEvent {

    private final CacheProcessor cacheProcessor;

    @PostConstruct
    public void initCache() {

        cacheProcessor.updateViewToMySql();
        cacheProcessor.flushRedis();
    }

    @Scheduled(cron = "0 0 0/1 * * ?")
    public void scheduleCache() {

        cacheProcessor.updateViewToMySql();
        cacheProcessor.flushRedis();
    }

}
