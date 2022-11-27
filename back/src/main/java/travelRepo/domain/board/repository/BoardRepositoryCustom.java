package travelRepo.domain.board.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import travelRepo.domain.board.dto.BoardListReq;
import travelRepo.domain.board.entity.Board;

public interface BoardRepositoryCustom {

    Slice<Board> findAllByQueries(String[] queries, Pageable pageable, BoardListReq boardListReq);

    Slice<Board> findAllByAccountIdWithBoardTagsAndAccount(Long accountId, Long lastBoardId, Pageable pageable);

    Slice<Board> findAllByAccountLikesWithBoardTagsAndAccount(Long accountId, Long lastLikeId, Pageable pageable);
}
