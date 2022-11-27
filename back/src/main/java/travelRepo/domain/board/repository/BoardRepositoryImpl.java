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
import travelRepo.domain.board.dto.BoardListReq;
import travelRepo.domain.board.entity.*;

import java.util.List;

import static travelRepo.domain.board.entity.QBoard.*;
import static travelRepo.domain.board.entity.QBoardTag.boardTag;
import static travelRepo.domain.board.entity.QTag.*;
import static travelRepo.domain.likes.entity.QLikes.likes;

@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Board> findAllByQueries(String[] queries, Pageable pageable, BoardListReq boardListReq) {

        JPAQuery<Board> query = jpaQueryFactory
                .selectFrom(board).distinct()
                .leftJoin(board.boardTags, boardTag)
                .leftJoin(boardTag.tag, tag)
                .offset(pageable.getOffset()) // 삭제 예정
                .limit(pageable.getPageSize());

        for (String q : queries) {
            query.where(boardContainsQuery(q));
        }

        if (boardListReq.getCategory() != null) {
            query.where(board.category.eq(boardListReq.getCategory()));
        }

        sort(pageable, query, boardListReq);
        query.orderBy(board.id.desc());

        List<Board> boards = query.fetch();

        return new SliceImpl<>(boards, pageable, boards.size() == pageable.getPageSize());
    }

    @Override
    public Slice<Board> findAllByAccountIdWithBoardTagsAndAccount(Long accountId, Long lastBoardId, Pageable pageable) {

        JPAQuery<Board> query = jpaQueryFactory
                .selectFrom(board).distinct()
                .where(board.account.id.eq(accountId))
                .orderBy(board.createdAt.desc())
                .offset(pageable.getOffset()) // 삭제 예정
                .limit(pageable.getPageSize());

        if (lastBoardId != null) {
            query.where(board.id.lt(lastBoardId));
        }

        List<Board> boards = query.fetch();

        return new SliceImpl<>(boards, pageable, boards.size() == pageable.getPageSize());
    }

    @Override
    public Slice<Board> findAllByAccountLikesWithBoardTagsAndAccount(Long accountId, Long lastLikeId, Pageable pageable) {

        JPAQuery<Board> query = jpaQueryFactory
                .selectFrom(board).distinct()
                .leftJoin(likes).on(board.id.eq(likes.board.id))
                .where(likes.account.id.eq(accountId))
                .orderBy(likes.createdAt.desc())
                .offset(pageable.getOffset()) // 삭제 예정
                .limit(pageable.getPageSize());

        if (lastLikeId != null) {
            query.where(likes.id.lt(lastLikeId));
        }

        List<Board> boards = query.fetch();

        return new SliceImpl<>(boards, pageable, boards.size() == pageable.getPageSize());
    }

    private BooleanExpression boardContainsQuery(String q) {
        return board.title.contains(q).or(board.content.contains(q).or(tag.name.contains(q)));
    }

    private BooleanExpression startPointById(Long boardId) {

        if (boardId == null) {
            return null;
        }

        return board.id.lt(boardId);
    }

    private BooleanExpression startPointByViews(Long boardId, Integer boardViews) {

        if (boardId == null || boardViews == null) {
            return null;
        }

        return board.views.lt(boardViews).or(board.views.eq(boardViews).and(board.id.lt(boardId)));
    }

    private BooleanExpression startPointByLikeCount(Long boardId, Integer boardLikeCount) {

        if (boardId == null || boardLikeCount == null) {
            return null;
        }

        return board.likeCount.lt(boardLikeCount).or(board.likeCount.eq(boardLikeCount).and(board.id.lt(boardId)));
    }

    private void sort(Pageable pageable, JPAQuery<Board> query, BoardListReq boardListReq) {

        if (pageable.getSort().isEmpty()) {
            query.where(startPointById(boardListReq.getLastBoardId()));
            query.orderBy(board.createdAt.desc());
            return;
        }

        for (Sort.Order o : pageable.getSort()) {

            switch (o.getProperty()) {
                case "createdAt" :
                    query.where(startPointById(boardListReq.getLastBoardId()));
                    break;
                case "views" :
                    query.where(startPointByViews(boardListReq.getLastBoardId(), boardListReq.getLastBoardViews()));
                    break;
                case "likeCount" :
                    query.where(startPointByLikeCount(boardListReq.getLastBoardId(), boardListReq.getLastBoardLikeCount()));
                    break;
            }

            PathBuilder pathBuilder = new PathBuilder<>(board.getType(), board.getMetadata());
            query.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                    pathBuilder.get(o.getProperty())));
        }
    }
}
