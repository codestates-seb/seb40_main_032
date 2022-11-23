package travelRepo.domain.board.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.board.entity.Board;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {

    @Modifying(flushAutomatically = true)
    @Query("delete from Board board where board.account.id = :accountId")
    void deleteByAccountId(@Param("accountId") Long accountId);

    @EntityGraph(attributePaths = {"boardTags", "account"})
    @Query("select b from Board b where b.id = :boardId")
    Optional<Board> findByIdWithBoardTagsAndAccount(@Param("boardId") Long boardId);

    @EntityGraph(attributePaths = {"boardTags", "account"})
    @Query("select b from Board b where b.account.id = :accountId")
    Slice<Board> findAllByAccountWithBoardTagsAndAccount(@Param("accountId") Long accountId, Pageable pageable);

    @Modifying(flushAutomatically = true)
    @Query("update Board b set b.views = b.views + 1 where b.id = :boardId")
    int updateViews(@Param("boardId") Long boardId);

    @Modifying(flushAutomatically = true)
    @Query("update Board b set b.likeCount = b.likeCount + 1 where b.id = :boardId")
    void upLikeCount(@Param("boardId") Long boardId);

    @Modifying(flushAutomatically = true)
    @Query("update Board b set b.likeCount = b.likeCount - 1 where b.id = :boardId")
    void downLikeCount(@Param("boardId") Long boardId);
}
