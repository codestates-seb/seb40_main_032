package travelRepo.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelRepo.domain.board.entity.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findTagByName(String tagName);
}
