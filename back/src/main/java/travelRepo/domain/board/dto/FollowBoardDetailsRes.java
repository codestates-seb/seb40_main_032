package travelRepo.domain.board.dto;

import lombok.Data;
import travelRepo.domain.board.entity.Board;

@Data
public class FollowBoardDetailsRes {

    private Long id;

    private String thumbnail;

    private String title;

    public static FollowBoardDetailsRes of(Board board) {

        FollowBoardDetailsRes followBoardDetailsRes = new FollowBoardDetailsRes();

        followBoardDetailsRes.setId(board.getId());
        followBoardDetailsRes.setThumbnail(board.getBoardPhotos().stream()
                .findFirst().get().getPhoto());
        followBoardDetailsRes.setTitle(board.getTitle());

        return followBoardDetailsRes;
    }
}
