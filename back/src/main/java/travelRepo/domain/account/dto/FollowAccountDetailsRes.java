package travelRepo.domain.account.dto;

import lombok.Data;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.board.dto.FollowBoardDetailsRes;
import travelRepo.domain.board.entity.Board;

import java.util.ArrayList;
import java.util.List;

@Data
public class FollowAccountDetailsRes {

    private Long id;

    private String nickname;

    private String profile;

    private boolean follow = false;

    private List<FollowBoardDetailsRes> boards = new ArrayList<>();

    public static FollowAccountDetailsRes of(Account account) {

        FollowAccountDetailsRes followAccountDetailsRes = new FollowAccountDetailsRes();

        followAccountDetailsRes.setId(account.getId());
        followAccountDetailsRes.setNickname(account.getNickname());
        followAccountDetailsRes.setProfile(account.getProfile());
        List<Board> accountBoards = account.getBoards();

        accountBoards.sort((a, b) -> a.getCreatedAt().isAfter(b.getCreatedAt()) ? -1 : 1);
        int size = Math.min(6, accountBoards.size());
        for (int i = 0; i < size; i++) {
            Board board = accountBoards.get(i);
            followAccountDetailsRes.getBoards().add(FollowBoardDetailsRes.of(board));
        }

        return followAccountDetailsRes;

    }
}
