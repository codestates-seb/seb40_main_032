package travelRepo.domain.board.entity;

import lombok.Getter;

@Getter
public enum Category {

    RESTAURANT("맛집"),
    SPOT("여행지"),
    STAY("숙소");

    private final String name;

    Category(String name) {
        this.name = name;
    }
}
