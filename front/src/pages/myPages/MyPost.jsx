import React, { useState } from 'react';
import styled from 'styled-components';
import Post from '../../component/common/Post';
import useIntersect from '../../hooks/useIntersect';
import { getCookie } from '../../util/cookie';
import LoadingSpinner from '../../component/common/LoadingSpinner';

const MyPageMain = styled.main`
  padding-top: 23rem;
  max-width: 172rem;
  margin: 0 3rem;
  display: flex;
  flex-wrap: wrap;

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
    .post,
    .post__skeleton {
      flex-basis: 100%;
    }
  }
`;

function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const accountId = getCookie('accountId');
  const target = useIntersect(
    `/boards/account/${accountId}?`,
    15,
    setMyPost,
    setIsPending,
    1,
  );

  return (
    <MyPageMain>
      {myPost.map(post => {
        return <Post key={post.boardId} post={post} />;
      })}
      <div ref={target} className="target">
        {isPending && <LoadingSpinner />}
      </div>
    </MyPageMain>
  );
}

export default MyPost;
