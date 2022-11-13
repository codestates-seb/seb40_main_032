package travelRepo.domain.account.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AccountModifyReq {

    private String password;

    private String nickname;

    private String intro;

    private MultipartFile profile;
}
