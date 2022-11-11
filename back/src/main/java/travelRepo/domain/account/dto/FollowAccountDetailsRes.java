package travelRepo.domain.account.dto;

import lombok.Data;
import travelRepo.domain.board.dto.FollowBoardDetailsRes;

import java.util.ArrayList;
import java.util.List;

@Data
public class FollowAccountDetailsRes {

    private Long id;

    private String nickname;

    private String profile;

    private boolean follow = false;

    private List<FollowBoardDetailsRes> boards = new ArrayList<>();
}
