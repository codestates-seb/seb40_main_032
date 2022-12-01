import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';
import Post from '../../component/common/Post';
import useIntersect from '../../hooks/useIntersect';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import EmptyText from '../../component/common/EmptyText';

const MyPageMain = styled.main`
  padding-top: 23rem;
  max-width: 172rem;
  margin: 0 3rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .empty__like {
    width: 100%;
    height: calc(100vh - 41.1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      padding-bottom: 3rem;
    }

    @media screen and (max-width: 549px) {
      height: calc(100vh - 8rem - 16.5rem - 16.6rem);
      > div {
        font-size: 2rem;
        > span {
          width: 4rem;
          height: 4rem;
        }
      }
    }
  }

  .target {
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 1440px) {
    .post,
    .post__skeleton {
      flex-basis: 25%;
    }
  }

  @media screen and (max-width: 1024px) {
    .post,
    .post__skeleton {
      flex-basis: 33.3%;
    }
  }

  @media screen and (max-width: 768px) {
    .post,
    .post__skeleton {
      flex-basis: 50%;
    }
  }

  @media screen and (max-width: 549px) {
    margin: 0 1rem;
    padding-top: 16.5rem;
    .post,
    .post__skeleton {
      flex-basis: 100%;
    }
  }
`;

function MyLikes() {
  const [myLike, setMyLike] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const { accountId } = useParams();
  const [target] = useIntersect(
    `/boards/like/account/${accountId}?`,
    '',
    15,
    setMyLike,
    setIsPending,
    '0',
    'createdAt,desc',
    'like',
  );
  return (
    <MyPageMain>
      {myLike.map(like => {
        return <Post key={like.boardId} post={like} />;
      })}
      {!isPending && myLike.length === 0 && (
        <div className="empty__like">
          <EmptyText
            icon={<HiOutlineHeart />}
            text="스토리에 좋아요를 해보세요."
          />
        </div>
      )}
      <div ref={target} className="target">
        {isPending && <LoadingSpinner />}
      </div>
    </MyPageMain>
  );
}

export default MyLikes;
