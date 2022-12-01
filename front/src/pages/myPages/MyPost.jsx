import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { BsCamera } from 'react-icons/bs';
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

  .empty__post {
    width: 100%;
    height: calc(100vh - 41.1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      padding-bottom: 6rem;
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
    padding-top: 16.5rem;
    margin: 0 1rem;
    .post,
    .post__skeleton {
      flex-basis: 100%;
    }
  }
`;

function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const { accountId } = useParams();
  const [target] = useIntersect(
    `/boards/account/${accountId}?`,
    '',
    15,
    setMyPost,
    setIsPending,
    0,
  );

  return (
    <MyPageMain>
      {myPost.map(post => {
        return <Post key={post.boardId} post={post} />;
      })}
      {!isPending && myPost.length === 0 && (
        <div className="empty__post">
          <EmptyText icon={<BsCamera />} text="스토리를 공유해보세요." />
        </div>
      )}
      <div ref={target} className="target">
        {isPending && <LoadingSpinner />}
      </div>
    </MyPageMain>
  );
}

export default MyPost;
