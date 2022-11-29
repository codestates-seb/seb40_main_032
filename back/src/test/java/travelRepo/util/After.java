package travelRepo.util;

import org.junit.jupiter.api.AfterAll;

import java.io.File;

public class After {

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
}
