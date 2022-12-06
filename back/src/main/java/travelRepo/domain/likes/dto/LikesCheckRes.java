package travelRepo.domain.likes.dto;

import lombok.Data;

@Data
public class LikesCheckRes {

    private boolean likes;

    public static LikesCheckRes of(boolean likes) {

        LikesCheckRes likesCheckRes = new LikesCheckRes();
        likesCheckRes.setLikes(likes);

        return likesCheckRes;
    }
}
