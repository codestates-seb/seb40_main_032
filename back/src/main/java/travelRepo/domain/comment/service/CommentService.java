package travelRepo.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.comment.dto.CommentAddReq;
import travelRepo.domain.comment.dto.CommentDetailsRes;
import travelRepo.domain.comment.dto.CommentModifyReq;
import travelRepo.domain.comment.entity.Comment;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.global.common.dto.SliceDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional
    public void modifyComment(CommentModifyReq commentModifyReq, Long commentId, Long loginAccountId) {

        Comment comment = commentRepository.findByIdWithAccount(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_COMMENT));

        if (!loginAccountId.equals(comment.getAccount().getId())) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
        }

        comment.modify(commentModifyReq.getContent());
    }

    public SliceDto<CommentDetailsRes> commentList(Long boardId, Pageable pageable) {

        Slice<Comment> comments = commentRepository.findAllByBoard_Id(boardId, pageable);

        return new SliceDto(comments.map(CommentDetailsRes::of));
    }
}
