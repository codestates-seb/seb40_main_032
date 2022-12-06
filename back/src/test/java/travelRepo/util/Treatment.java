package travelRepo.util;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import travelRepo.global.cache.CacheProcessor;

import java.io.File;

public class Treatment {

    @Autowired
    CacheProcessor cacheProcessor;

    @AfterAll
    static void deleteTestFolder() {

        File folder = new File("./testImg");
        File[] files = folder.listFiles();

        if (files == null) {
            return;
        }

        for (File file : files) {
            if (file.getName().equals(".gitkeep") || file.getName().equals("test.jpeg")) {
                continue;
            }
            file.delete();
        }
    }

    @BeforeEach
    void flushRedis() {
        cacheProcessor.flushRedis();
    }
}
