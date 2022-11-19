import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import Post from '../common/Post';
import MainSort from './MainSort';
// import PostSkeleton from '../common/PostSkeleton';

const MainContainer = styled.section`
  width: 100%;
  padding: 5rem calc(10rem - 1.2rem);
  position: relative;

  @media screen and (max-width: 549px) {
    padding: 0;
    padding-top: 5rem;
  }

  .main__container {
    max-width: 172rem;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 1440px) {
      .post,
      .post__skeleton {
        flex-basis: 33.3%;
      }
    }

    @media screen and (max-width: 1024px) {
      .post,
      .post__skeleton {
        flex-basis: 50%;
      }
    }

    @media screen and (max-width: 549px) {
      .post,
      .post__skeleton {
        flex-basis: 100%;
      }
    }
  }
`;

function MainContents({ axiosData, isPending, extraPage, posts }) {
  const target = useRef(null);

  // isPending 상태 확인용
  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          axiosData(20); // 데이터 요청
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
    <MainContainer>
      <MainSort />
      <div className="main__container">
        {posts.map(post => {
          return <Post key={uuid()} post={post} />;
        })}
        <div ref={target} className="target" />
      </div>
    </MainContainer>
  );
}

export default MainContents;
