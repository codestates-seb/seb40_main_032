package travelRepo.domain.account.entity;

import lombok.Getter;

@Getter
public enum Role {

    USER("ROLE_USER");

    private final String roleName;

    Role(String roleName) {
        this.roleName = roleName;
    }
}
