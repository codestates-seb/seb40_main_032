import React, { useState } from 'react';
import styled from 'styled-components';
import Post from '../../component/common/Post';
import useIntersect from '../../hooks/useIntersect';

const MyPageMain = styled.main`
  padding-top: 23rem;
  max-width: 172rem;
  margin: 0 3rem;
  display: flex;
  flex-wrap: wrap;

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
  const accountId = localStorage.getItem('id');
  const target = useIntersect(
    `/boards/account/${accountId}?`,
    15,
    setMyPost,
    setIsPending,
  );

  return (
    <MyPageMain>
      {myPost.map(post => {
        return <Post key={post.boardId} post={post} />;
      })}
      {isPending && <div>로딩중...</div>}
      <div ref={target} className="target" />
    </MyPageMain>
  );
}

export default MyPost;
