package travelRepo.global.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.board.repository.BoardRepository;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class CacheProcessor {

    RedisTemplate<String, String> redisTemplate;
    BoardRepository boardRepository;

    @Transactional
    @Scheduled(cron = "0 0 0/1 * * ?")
    public void updateViewToMySql() {

        Set<String> keys = redisTemplate.keys("boardView*");
        if (keys == null) {
            return;
        }
        for (String key : keys) {
            long boardId = Long.parseLong(key.split("::")[1]);
            int views = Integer.parseInt(redisTemplate.opsForValue().get(key));
            boardRepository.updateViews(boardId, views);
        }

        flushRedis();
    }

    public void flushRedis() {
        redisTemplate.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                connection.flushAll();
                return null;
            }
        });
    }
}
