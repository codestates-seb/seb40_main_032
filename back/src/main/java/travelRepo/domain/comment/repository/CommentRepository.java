package travelRepo.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Modifying(flushAutomatically = true)
    @Query("delete from Comment comment where comment.account.id = :accountId " +
            "or comment.board in (select board from Board board where board.account.id = :accountId)")
    void deleteByAccountId(@Param("accountId") Long accountId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Comment comment where comment.board.id = :boardId")
    void deleteByBoardId(@Param("boardId") Long boardId);
}
