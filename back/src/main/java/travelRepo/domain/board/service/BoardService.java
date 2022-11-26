package travelRepo.domain.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.*;
import travelRepo.domain.board.entity.*;
import travelRepo.domain.board.repository.BoardPhotoRepository;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.board.repository.TagRepository;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.domain.likes.likesRepository.LikesRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.common.dto.SliceDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;
import java.util.Set;
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
    private final RedisTemplate<String, String> redisTemplate;

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
    @CacheEvict(key = "#boardId", value = "findBoard")
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
    @CacheEvict(key = "#boardId", value = "{findBoard, boardView}")
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
    @Cacheable(key = "#boardId", value = "findBoard")
    public BoardDetailsRes findBoard(Long boardId) {

        Board board = boardRepository.findByIdWithBoardTagsAndAccount(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        return BoardDetailsRes.of(board);
    }

    public SliceDto<BoardSummaryRes> findBoards(BoardListReq boardListReq, Pageable pageable) {

        String[] queries = boardListReq.getQuery().strip().split("\\s+");

        Slice<Board> boards = boardRepository.findAllByQueries(queries, pageable, boardListReq);

        SliceDto<BoardSummaryRes> response = new SliceDto<>(boards.map(BoardSummaryRes::of));
        setRedisBoardViewsToRes(response);

        return response;
    }

    public SliceDto<BoardSummaryRes> findBoardsByAccount(Long accountId, Long lastBoardId, Pageable pageable) {

        Slice<Board> boards;
        if (lastBoardId == null) {
            boards = boardRepository.findAllByAccountIdWithBoardTagsAndAccountBefore(accountId, pageable);
        } else {
            boards = boardRepository.findAllByAccountIdWithBoardTagsAndAccount(accountId, lastBoardId, pageable);
            System.out.println("======================" + lastBoardId);
        }

        SliceDto<BoardSummaryRes> response = new SliceDto<>(boards.map(BoardSummaryRes::of));
        setRedisBoardViewsToRes(response);

        return response;
    }

    public SliceDto<BoardSummaryRes> findBoardsByLikes(Long accountId, Pageable pageable) {

        Slice<Board> boards = boardRepository.findAllByAccountLikesWithBoardTagsAndAccount(accountId, pageable);

        SliceDto<BoardSummaryRes> response = new SliceDto<>(boards.map(BoardSummaryRes::of));
        setRedisBoardViewsToRes(response);

        return response;
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

    private void setRedisBoardViewsToRes(SliceDto<BoardSummaryRes> response) {

        List<Long> boardIds = response.getContent().stream()
                .map(BoardSummaryRes::getBoardId)
                .collect(Collectors.toList());

        Set<String> keys = redisTemplate.keys("boardView*");

        for (String key : keys) {
            long boardId = Long.parseLong(key.split("::")[1]);
            int views = Integer.parseInt(redisTemplate.opsForValue().get(key));
            int index = boardIds.indexOf(boardId);

            if (index >= 0) {
                response.getContent().get(index).setViews(views);
            }
        }
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

    public void upViewToRedis(Long boardId, BoardDetailsRes boardDetailsRes) {

        String key = "boardView::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String view = valueOperations.get(key);
        if (view == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));
            valueOperations.set(key, String.valueOf(board.getViews() + 1));

            boardDetailsRes.setViews(board.getViews() + 1);
        } else {
            valueOperations.increment(key);
            boardDetailsRes.setViews(Integer.parseInt(view) + 1);
        }
    }
}
