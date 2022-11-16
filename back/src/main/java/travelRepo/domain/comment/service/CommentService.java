package travelRepo.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.comment.dto.CommentAddReq;
import travelRepo.domain.comment.entity.Comment;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public void addComment(CommentAddReq commentAddReq, Long loginAccountId) {

        Account account = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Board board = boardRepository.findById(commentAddReq.getBoardId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        Comment comment = commentAddReq.toComment(account, board);

        commentRepository.save(comment);
    }
}
