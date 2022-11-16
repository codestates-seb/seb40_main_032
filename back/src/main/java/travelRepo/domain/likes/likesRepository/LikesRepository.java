package travelRepo.domain.likes.likesRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.board.entity.Board;
import travelRepo.domain.likes.entity.Likes;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Modifying(flushAutomatically = true)
    @Query("delete from Likes likes where likes.account.id = :accountId " +
            "or likes.board in (select board from Board board where board.account.id = :accountId)")
    void deleteByAccountId(@Param("accountId") Long accountId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Likes likes where likes.board.id = :boardId")
    void deleteByBoardId(@Param("boardId") Long BoardId);

    boolean existsByAccount_IdAndBoard_Id(Long AccountId, Long BoardId);

    Optional<Likes> findByAccountAndBoard(Account account, Board board);
}
