package travelRepo.global.security.authentication;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Principal {

    private Long id;

    private String email;
}
