package travelRepo.domain.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard_Tag is a Querydsl query type for Board_Tag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard_Tag extends EntityPathBase<Board_Tag> {

    private static final long serialVersionUID = -515185690L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard_Tag board_Tag = new QBoard_Tag("board_Tag");

    public final QBoard board;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QTag tag;

    public QBoard_Tag(String variable) {
        this(Board_Tag.class, forVariable(variable), INITS);
    }

    public QBoard_Tag(Path<? extends Board_Tag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard_Tag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard_Tag(PathMetadata metadata, PathInits inits) {
        this(Board_Tag.class, metadata, inits);
    }

    public QBoard_Tag(Class<? extends Board_Tag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board"), inits.get("board")) : null;
        this.tag = inits.isInitialized("tag") ? new QTag(forProperty("tag")) : null;
    }

}

