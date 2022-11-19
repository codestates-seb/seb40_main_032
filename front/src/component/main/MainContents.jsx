import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
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

function MainContents() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [extraPage, setExtraPage] = useState(true);
  const page = useRef(1);
  const target = useRef(null);

  const axiosData = useCallback(async quantity => {
    try {
      setIsPending(true);
      const { data } = await axios(
        `http://13.125.238.70:8080/boards?category=RESTAURANT&size=${quantity}&page=${page.current}`,
      );
      // console.log(data.content);
      setPosts(prev => [...prev, ...data.content]);
      setIsPending(false);
      setExtraPage(data.hasNext);
      // console.log(data.content.length);
      if (data.content.length) {
        page.current += 1;
      }
      // console.log(page);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

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
    return () => io.unobserve(target.current);
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
