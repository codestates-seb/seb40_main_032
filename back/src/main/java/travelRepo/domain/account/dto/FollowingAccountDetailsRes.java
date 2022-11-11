package travelRepo.domain.account.dto;

import lombok.Data;
import travelRepo.domain.board.dto.FollowingBoardDetailsRes;

import java.util.ArrayList;
import java.util.List;

@Data
public class FollowingAccountDetailsRes {

    private Long id;

    private String nickname;

    private String profile;

    private List<FollowingBoardDetailsRes> followingBoardDetailsResList = new ArrayList<>();
}
