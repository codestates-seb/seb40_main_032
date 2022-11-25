package travelRepo.domain.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.BoardAddReq;
import travelRepo.domain.board.dto.BoardDetailsRes;
import travelRepo.domain.board.dto.BoardModifyReq;
import travelRepo.domain.board.dto.BoardSummaryRes;
import travelRepo.domain.board.entity.*;
import travelRepo.domain.board.repository.BoardPhotoRepository;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.board.repository.TagRepository;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.domain.likes.entity.Likes;
import travelRepo.domain.likes.likesRepository.LikesRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.SliceDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardPhotoRepository boardPhotoRepository;
    private final BoardTagRepository boardTagRepository;
    private final CommentRepository commentRepository;
    private final TagRepository tagRepository;
    private final LikesRepository likesRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public IdDto addBoard(Long loginAccountId, BoardAddReq boardAddReq) {

        Account account = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Board board = boardAddReq.toBoard(account);
        addBoardPhotosToBoard(boardAddReq.getImages(), board);
        addBoardTagsToBoard(boardAddReq.getTags(), board);

        Board savedBoard = boardRepository.save(board);

        return new IdDto(savedBoard.getId());
    }

    @Transactional
    public IdDto modifyBoard(Long loginAccountId, BoardModifyReq boardModifyReq, Long boardId) {

        Board board = boardRepository.findByIdWithBoardTagsAndAccount(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        if (!loginAccountId.equals(board.getAccount().getId())) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
        }

        Board modifyBoard = boardModifyReq.toBoard();
        board.modify(modifyBoard);

        Optional.ofNullable(boardModifyReq.getImages()).ifPresent(images -> addBoardPhotosToBoard(images, board));

        Optional.ofNullable(boardModifyReq.getTags()).ifPresent(tagNames -> addBoardTagsToBoard(tagNames, board));

        return new IdDto(boardId);
    }

    @Transactional
    public void removeBoard(Long loginAccountId, Long boardId) {

        Board board = boardRepository.findByIdWithBoardTagsAndAccount(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        Account account = board.getAccount();

        if (!loginAccountId.equals(account.getId())) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
        }

        account.getBoards().remove(board);
        boardTagRepository.deleteByBoardId(boardId);
        boardPhotoRepository.deleteByBoardId(boardId);
        commentRepository.deleteByBoardId(boardId);
        likesRepository.deleteByBoardId(boardId);
        boardRepository.deleteById(boardId);
    }

    @Transactional
    public BoardDetailsRes findBoard(Long boardId) {

        Board board = boardRepository.findByIdWithBoardTagsAndAccount(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        boardRepository.updateViews(boardId);

        return BoardDetailsRes.of(board);
    }

    public SliceDto<BoardSummaryRes> findBoards(String query, Category category, Pageable pageable) {

        if (query == null) {
            query = "";
        }

        String[] queries = query.strip().split("\\s+");

        Slice<Board> boards = boardRepository.findAllByQueries(queries, category, pageable);

        return new SliceDto<>(boards.map(BoardSummaryRes::of));
    }

    public SliceDto<BoardSummaryRes> findBoardsByAccount(Long accountId, Pageable pageable) {

        Slice<Board> boards = boardRepository.findAllByAccountIdWithBoardTagsAndAccount(accountId, pageable);

        return new SliceDto<>(boards.map(BoardSummaryRes::of));
    }

    public SliceDto<BoardSummaryRes> findBoardsByLikes(Long accountId, Pageable pageable) {

        Slice<Likes> likes = likesRepository.findAllByAccountIdWithBoard(accountId, pageable);
        Slice<Board> boards = likes.map(Likes::getBoard);

        return new SliceDto<>(boards.map(BoardSummaryRes::of));
    }

    private void addBoardTagsToBoard(List<String> tagNames, Board board) {

        List<BoardTag> boardTags = tagNames.stream()
                .map((tagName -> {

                    Tag tag = findTag(tagName);
                    BoardTag boardTag = board.getBoardTags().stream()
                            .filter(bt -> bt.getTag().getName().equals(tagName))
                            .findAny()
                            .orElseGet(() -> BoardTag.builder()
                                    .tag(tag)
                                    .build());

                    boardTag.setOrders(tagNames.indexOf(tagName));
                    return boardTag;

                })).collect(Collectors.toList());

        board.addBoardTags(boardTags);
    }

    private void addBoardPhotosToBoard(List<String> images, Board board) {

        List<BoardPhoto> boardPhotos = images.stream()
                .map(image -> {

                    BoardPhoto boardPhoto = board.getBoardPhotos().stream()
                            .filter(bp -> bp.getPhoto().equals(image))
                            .findAny()
                            .orElseGet(() -> BoardPhoto.builder()
                                    .photo(image)
                                    .build());
                    boardPhoto.setOrders(images.indexOf(image));
                    return boardPhoto;

                })
                .collect(Collectors.toList());

        board.addBoardPhotos(boardPhotos);
    }

    @Transactional
    protected Tag findTag(String tagName) {

        return tagRepository.findTagByName(tagName)
                .orElseGet(() -> addTag(tagName));
    }

    @Transactional
    protected Tag addTag(String tagName) {

        Tag tag = Tag.builder()
                .name(tagName)
                .build();

        return tagRepository.save(tag);
    }
}
