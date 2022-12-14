package travelRepo.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelRepo.domain.board.entity.BoardPhoto;

public interface BoardPhotoRepository extends JpaRepository<BoardPhoto, Long> {

    @Modifying(flushAutomatically = true)
    @Query("delete from BoardPhoto boardPhoto " +
            "where boardPhoto.board in (select board from Board board where board.account.id = :accountId)")
    void deleteByAccountId(@Param("accountId") Long accountId);

    @Modifying(clearAutomatically = true)
    @Query("delete from BoardPhoto boardPhoto where boardPhoto.board.id = :boardId")
    void deleteByBoardId(@Param("boardId") Long boardId);
}
