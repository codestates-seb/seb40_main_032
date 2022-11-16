package travelRepo.domain.follow.dto;

import lombok.Data;

@Data
public class FollowCheckRes {

    private boolean follow;

    public static FollowCheckRes of(boolean follow) {

        FollowCheckRes followCheckRes = new FollowCheckRes();
        followCheckRes.setFollow(follow);

        return followCheckRes;
    }
}
