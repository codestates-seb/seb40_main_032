package travelRepo.domain.likes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.likes.dto.LikesCheckRes;
import travelRepo.domain.likes.dto.LikesPostRes;
import travelRepo.domain.likes.entity.Likes;
import travelRepo.domain.likes.likesRepository.LikesRepository;
import travelRepo.global.common.enums.Status;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;
    private final AccountRepository accountRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public LikesPostRes postLikes(Long loginAccountId, Long boardId) {

        Account loginAccount = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        Optional<Likes> optionalLikes = likesRepository.findByAccountAndBoard(loginAccount, board);
        if (optionalLikes.isEmpty()) {

            Likes likes = Likes.builder()
                    .account(loginAccount)
                    .board(board)
                    .build();

            likesRepository.save(likes);

            return LikesPostRes.of(Status.SUCCESS);
        }

        Likes likes = optionalLikes.get();
        likesRepository.delete(likes);

        return LikesPostRes.of(Status.CANCEL);
    }

    public LikesCheckRes checkLikes(Long loginAccountId, Long boardId) {

        boolean likes = likesRepository.existsByAccount_IdAndBoard_Id(loginAccountId, boardId);

        return LikesCheckRes.of(likes);
    }
}
