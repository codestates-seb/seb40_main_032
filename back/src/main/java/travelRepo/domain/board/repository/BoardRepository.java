package travelRepo.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelRepo.domain.board.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
