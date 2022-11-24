import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import myPostApi from '../../api/myPostApi';
import Post from '../../component/common/Post';

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

  // post데이터 호출 함수
  const getMyPost = () => {
    myPostApi().then(res => {
      setMyPost(res.content);
    });
  };

  useEffect(() => {
    getMyPost();
  }, []);

  return (
    <MyPageMain>
      {myPost &&
        myPost.map(post => {
          return <Post key={post.boardId} post={post} />;
        })}
    </MyPageMain>
  );
}

export default MyPost;
