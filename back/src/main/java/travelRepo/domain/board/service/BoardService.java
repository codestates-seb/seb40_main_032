package travelRepo.domain.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.repository.AccountRepository;
import travelRepo.domain.board.dto.BoardAddReq;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.BoardPhoto;
import travelRepo.domain.board.entity.BoardTag;
import travelRepo.domain.board.entity.Tag;
import travelRepo.domain.board.repository.BoardRepository;
import travelRepo.domain.board.repository.BoardTagRepository;
import travelRepo.domain.board.repository.TagRepository;
import travelRepo.global.common.dto.IdDto;
import travelRepo.global.exception.BusinessLogicException;
import travelRepo.global.exception.ExceptionCode;
import travelRepo.global.upload.service.UploadService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final BoardTagRepository boardTagRepository;
    private final UploadService uploadService;

    @Transactional
    public IdDto addBoard(Long loginAccountId, BoardAddReq boardAddReq) {

        Account account = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Board board = boardAddReq.toBoard(account);

        List<BoardPhoto> boardPhotos = board.getBoardPhotos();
        boardAddReq.getImages().stream()
                .forEach(image -> {
                    BoardPhoto boardPhoto = BoardPhoto.builder()
                            .board(board)
                            .photo(uploadService.upload(image))
                            .build();
                    boardPhotos.add(boardPhoto);
                });

        Board savedBoard = boardRepository.save(board);

        boardAddReq.getTags().stream()
                .forEach(tagName -> {
                    Tag tag = findTag(tagName);
                    BoardTag boardTag = BoardTag.builder()
                            .board(board)
                            .tag(tag)
                            .build();
                    boardTagRepository.save(boardTag);
                });

        return new IdDto(savedBoard.getId());
    }

    @Transactional
    private Tag findTag(String tagName) {

        return tagRepository.findTagByName(tagName)
                .orElseGet(() -> addTag(tagName));
    }

    @Transactional
    private Tag addTag(String tagName) {

        Tag tag = Tag.builder()
                .name(tagName)
                .build();

        return tagRepository.save(tag);
    }
}
