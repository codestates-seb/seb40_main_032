package travelRepo.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.board.entity.BoardTag;

public interface BoardTagRepository extends JpaRepository<BoardTag, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from BoardTag boardTag where boardTag.board " +
            "in (select board from Board board where board.account.id = :accountId)")
    void deleteByAccountId(@Param("accountId") Long accountId);
}
