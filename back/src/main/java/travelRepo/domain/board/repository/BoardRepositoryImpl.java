package travelRepo.domain.board.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import travelRepo.domain.board.entity.*;

import java.util.List;

import static travelRepo.domain.board.entity.QBoard.*;
import static travelRepo.domain.board.entity.QBoardTag.boardTag;
import static travelRepo.domain.board.entity.QTag.*;

@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Board> findAllByQueries(String[] queries, Category category, Pageable pageable) {

        JPAQuery<Board> query = jpaQueryFactory
                .selectFrom(board)
                .leftJoin(board.boardTags, boardTag)
                .leftJoin(boardTag.tag, tag)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        for (String q : queries) {
            query.where(boardContainsQuery(q));
        }

        if (category != null) {
            query.where(board.category.eq(category));
        }

        sort(pageable, query);
        query.orderBy(board.id.desc());

        List<Board> boards = query.distinct().fetch();

        return new SliceImpl<>(boards, pageable, boards.size() == pageable.getPageSize());
    }

    private BooleanExpression boardContainsQuery(String q) {
        return board.title.contains(q).or(board.content.contains(q).or(tag.name.contains(q)));
    }

    private void sort(Pageable pageable, JPAQuery<Board> query) {

        if (pageable.getSort().isEmpty()) {
            query.orderBy(board.createdAt.desc());
            return;
        }

        for (Sort.Order o : pageable.getSort()) {
            PathBuilder pathBuilder = new PathBuilder<>(board.getType(), board.getMetadata());
            query.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                    pathBuilder.get(o.getProperty())));
        }
    }
}
