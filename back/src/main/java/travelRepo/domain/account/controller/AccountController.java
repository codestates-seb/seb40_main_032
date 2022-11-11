package travelRepo.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelRepo.domain.account.dto.*;
import travelRepo.domain.board.dto.FollowBoardDetailsRes;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.PageDto;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    @PostMapping
    public ResponseEntity<IdDto> accountAdd(@ModelAttribute AccountAddReq accountAddReq) {
        return new ResponseEntity<>(new IdDto(1L), HttpStatus.CREATED);
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<IdDto> accountModify(@PathVariable Long accountId,
                                               @ModelAttribute AccountModifyReq accountModifyReq) {
        return new ResponseEntity<>(new IdDto(1L), HttpStatus.OK);
    }

    @DeleteMapping
    public void accountRemove() {
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDetailsRes> accountDetails(@PathVariable Long accountId) {

        AccountDetailsRes accountDetailsRes = new AccountDetailsRes();
        accountDetailsRes.setId(1L);
        accountDetailsRes.setEmail("mock@mock.com");
        accountDetailsRes.setNickname("mockNickname");
        accountDetailsRes.setIntro("mockIntro");
        accountDetailsRes.setProfile("/mock/path");
        accountDetailsRes.setFollower(29);
        accountDetailsRes.setFollowing(53);

        return new ResponseEntity<>(accountDetailsRes, HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<LoginAccountDetailsRes> loginAccountDetails() {

        LoginAccountDetailsRes loginAccountDetailsRes = new LoginAccountDetailsRes();
        loginAccountDetailsRes.setId(1L);
        loginAccountDetailsRes.setEmail("mock@mock.com");
        loginAccountDetailsRes.setNickname("mockNickname");
        loginAccountDetailsRes.setProfile("/mock/path");
        loginAccountDetailsRes.setFollower(29);
        loginAccountDetailsRes.setFollowing(53);

        return new ResponseEntity<>(loginAccountDetailsRes, HttpStatus.OK);
    }

    @GetMapping("/follow/{accountId}")
    public ResponseEntity<PageDto<FollowAccountDetailsRes>> followAccountList(@PathVariable Long accountId,
                                                                              @RequestParam String status,
                                                                              Pageable pageable) {

        List<FollowAccountDetailsRes> followAccountDetailsResList = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            FollowAccountDetailsRes followAccountDetailsRes = new FollowAccountDetailsRes();
            followAccountDetailsRes.setId(1L + i * 6);
            followAccountDetailsRes.setNickname("mockNickname" + (1L + i * 6));
            followAccountDetailsRes.setProfile("/mock/path" + (1L + i * 6));

            for (int j = 0; j < 5; j++) {
                FollowBoardDetailsRes followBoardDetailsRes = new FollowBoardDetailsRes();
                followBoardDetailsRes.setId(2L + j + i * 6);
                followBoardDetailsRes.setTitle("mockTitle" + (2L + j + i * 6));
                followBoardDetailsRes.setThumbnail("/mock/path" + (2L + j + i * 6));

                followAccountDetailsRes.getBoards().add(followBoardDetailsRes);
            }

            followAccountDetailsResList.add(followAccountDetailsRes);
        }

        Page<FollowAccountDetailsRes> response = new PageImpl<>(followAccountDetailsResList, pageable, 30);
        return new ResponseEntity<>(new PageDto<>(response), HttpStatus.OK);
    }
}
