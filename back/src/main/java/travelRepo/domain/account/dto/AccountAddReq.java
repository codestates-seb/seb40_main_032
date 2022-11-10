package travelRepo.domain.account.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AccountAddReq {

    private String email;

    private String password;

    private String nickname;

    private MultipartFile profile;
}
