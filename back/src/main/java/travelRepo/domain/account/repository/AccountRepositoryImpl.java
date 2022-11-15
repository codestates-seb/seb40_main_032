package travelRepo.domain.account.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import travelRepo.domain.account.entity.Account;
import travelRepo.domain.account.entity.QAccount;

import java.util.List;

import static travelRepo.domain.follow.entity.QFollow.follow;

@RequiredArgsConstructor
public class AccountRepositoryImpl implements AccountRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Account> findByFollow(Long accountId, String status, Pageable pageable) {

        QAccount selectAccount = follow.following;
        QAccount whereAccount = follow.follower;
        if (status.equals("follower")) {
            selectAccount = follow.follower;
            whereAccount = follow.following;
        }

        JPAQuery<Account> query = jpaQueryFactory
                .select(selectAccount)
                .from(follow)
                .where(whereAccount.id.eq(accountId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        sort(pageable, selectAccount, query);

        List<Account> accounts = query.fetch();

        return new PageImpl<>(accounts, pageable, accounts.size());
    }

    private static void sort(Pageable pageable, QAccount account, JPAQuery<Account> query) {
        if (pageable.getSort().isEmpty()) {
            query.orderBy(follow.createdAt.asc());
            return;
        }

        for (Sort.Order o : pageable.getSort()) {
            PathBuilder pathBuilder = new PathBuilder(account.getType(), account.getMetadata());
            query.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                    pathBuilder.get(o.getProperty())));
        }
    }
}
