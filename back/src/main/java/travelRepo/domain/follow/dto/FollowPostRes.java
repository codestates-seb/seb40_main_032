package travelRepo.domain.follow.dto;

import lombok.Data;
import travelRepo.global.common.enums.Status;

@Data
public class FollowPostRes {

    private Status status;

    public static FollowPostRes of(Status status) {

        FollowPostRes followPostRes = new FollowPostRes();
        followPostRes.setStatus(status);

        return followPostRes;
    }
}
