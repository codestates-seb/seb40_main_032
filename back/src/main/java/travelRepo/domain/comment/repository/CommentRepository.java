package travelRepo.domain.comment.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.comment.entity.Comment;

import java.time.LocalDateTime;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Modifying(flushAutomatically = true)
    @Query("delete from Comment comment where comment.account.id = :accountId " +
            "or comment.board in (select board from Board board where board.account.id = :accountId)")
    void deleteByAccountId(@Param("accountId") Long accountId);

    @Modifying(clearAutomatically = true)
    @Query("delete from Comment comment where comment.board.id = :boardId")
    void deleteByBoardId(@Param("boardId") Long boardId);

    @EntityGraph(attributePaths = {"account"})
    @Query("select c from Comment c where c.id = :commentId")
    Optional<Comment> findByIdWithAccount(@Param("commentId") Long commentId);

    @EntityGraph(attributePaths = {"account"})
    Slice<Comment> findAllByBoard_Id(Long boardsId, Pageable pageable);

    @EntityGraph(attributePaths = {"account"})
    @Query("select c from Comment c where c.board.id = :boardId " +
            "and (c.createdAt < :lastCommentCreatedAt or (c.createdAt = :lastCommentCreatedAt and c.id < :lastCommentId))")
    Slice<Comment> findAllAfterLastByBoardId(@Param("boardId") Long boardId, @Param("lastCommentId") Long lastCommentId
            , @Param("lastCommentCreatedAt") LocalDateTime lastCommentCreatedAt, Pageable pageable);
}
