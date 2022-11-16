package travelRepo.domain.likes.dto;

import lombok.Data;
import travelRepo.global.common.enums.Status;

@Data
public class LikesPostRes {

    private Status status;

    public static LikesPostRes of(Status status) {

        LikesPostRes likesPostRes = new LikesPostRes();
        likesPostRes.setStatus(status);

        return likesPostRes;
    }
}
