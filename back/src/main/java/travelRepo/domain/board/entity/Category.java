package travelRepo.domain.board.entity;

import lombok.Getter;

@Getter
public enum Category {

    RESTAURANT("레스토랑"),
    SPOT("명소"),
    STAY("숙박 시설");

    private final String name;

    Category(String name) {
        this.name = name;
    }
}
