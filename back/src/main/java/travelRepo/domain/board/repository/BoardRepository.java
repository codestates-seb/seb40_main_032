package travelRepo.domain.board.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.board.entity.Board;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Board board where board.account.id = :accountId")
    void deleteByAccountId(@Param("accountId") Long accountId);

    @EntityGraph(attributePaths = {"boardTags", "account"})
    @Query("select b from Board b where b.id = :boardId")
    Optional<Board> findByIdWithBoardTagsAndAccount(@Param("boardId") Long boardId);
}
