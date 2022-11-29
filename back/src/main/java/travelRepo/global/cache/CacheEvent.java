package travelRepo.global.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.global.cache.CacheProcessor;

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
