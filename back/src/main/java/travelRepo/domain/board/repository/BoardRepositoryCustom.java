package travelRepo.domain.board.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.board.entity.Category;

public interface BoardRepositoryCustom {

    Slice<Board> findAllByQueries(String[] queries, Category category, Pageable pageable);
}
