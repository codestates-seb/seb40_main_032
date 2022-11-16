package travelRepo.domain.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.BoardAddReq;
import travelRepo.domain.board.dto.BoardModifyReq;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.BoardPhoto;
import travelRepo.domain.board.entity.BoardTag;
import travelRepo.domain.board.entity.Tag;
import travelRepo.domain.board.repository.BoardPhotoRepository;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.board.repository.TagRepository;
import travelRepo.domain.comment.repository.CommentRepository;
import travelRepo.domain.likes.likesRepository.LikesRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.upload.service.UploadService;

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
    private final UploadService uploadService;

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

        Optional.ofNullable(boardModifyReq.getImages()).ifPresent(images -> {
            boardPhotoRepository.deleteByBoardId(boardId);
            addBoardPhotosToBoard(images, board);
        });

        Optional.ofNullable(boardModifyReq.getTags()).ifPresent(tagNames -> {
            boardTagRepository.deleteByBoardId(boardId);
            addBoardTagsToBoard(boardModifyReq.getTags(), board);
        });

        return new IdDto(boardId);
    }

    @Transactional
    public void removeBoard(Long loginAccountId, Long boardId) {

        Board board = boardRepository.findByIdWithBoardTagsAndAccount(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_BOARD));

        if (!loginAccountId.equals(board.getAccount().getId())) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
        }

        Account account = board.getAccount();

        account.getBoards().remove(board);
        boardTagRepository.deleteByBoardId(boardId);
        boardPhotoRepository.deleteByBoardId(boardId);
        commentRepository.deleteByBoardId(boardId);
        likesRepository.deleteByBoardId(boardId);
        boardRepository.deleteById(boardId);
    }

    private void addBoardTagsToBoard(List<String> tagNames, Board board) {

        List<BoardTag> boardTags = tagNames.stream()
                .map((tagName -> {
                    Tag tag = findTag(tagName);
                    BoardTag boardTag = BoardTag.builder()
                            .tag(tag)
                            .build();
                    return boardTag;
                })).collect(Collectors.toList());

        board.addBoardTags(boardTags);
    }

    private void addBoardPhotosToBoard(List<MultipartFile> images, Board board) {

        List<BoardPhoto> boardPhotos = images.stream()
                .map(image -> {
                    BoardPhoto boardPhoto = BoardPhoto.builder()
                            .photo(uploadService.upload(image))
                            .build();
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
