package travelRepo.domain.likes.likesRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.likes.entity.Likes;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Modifying(flushAutomatically = true)
    @Query("delete from Likes likes where likes.account.id = :accountId " +
            "or likes.board in (select board from Board board where board.account.id = :accountId)")
    void deleteByAccountId(@Param("accountId") Long accountId);
}
