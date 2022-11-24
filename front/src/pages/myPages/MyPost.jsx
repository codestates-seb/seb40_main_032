import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  const target = useRef(null);
  const [myPost, setMyPost] = useState([]);
  const [extraPage, setExtraPage] = useState(true);
  const page = useRef(1);

  // post데이터 호출 함수
  const getMyPost = useCallback(quantity => {
    myPostApi(quantity, page)
      .then(res => {
        setMyPost(prev => [...prev, ...res.content]);
        setExtraPage(res.hasNext);
        console.log(res);
        if (res.content.length) {
          page.current += 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getMyPost(); // 데이터 요청
        }
      },
      { threshold: 1 },
    );
    if (target.current && extraPage) {
      io.observe(target.current);
    }
    return () => io.disconnect();
  }, [extraPage]);

  return (
    <MyPageMain>
      {myPost &&
        myPost.map(post => {
          return <Post key={post.boardId} post={post} />;
        })}
      <div ref={target} className="target" />
    </MyPageMain>
  );
}

export default MyPost;
