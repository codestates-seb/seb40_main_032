import { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';

function RestaurantPage() {
  const target = useRef(null);
  const [isPending, setIsPending] = useState(true);
  const [extraPage, setExtraPage] = useState(true);
  const [posts, setPosts] = useState([]);
  const page = useRef(1);

  const getRestaurantData = useCallback(async quantity => {
    try {
      setIsPending(true);
      const { data } = await axios(
        `/boards?category=RESTAURANT&size=${quantity}&page=${page.current}`,
      );
      console.log(data.content);
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
          getRestaurantData(20); // 데이터 요청
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
    <>
      <MainSort />
      <div className="main__container">
        {posts.map(post => {
          return <Post key={post.boardId} post={post} />;
        })}
        <div ref={target} className="target" />
      </div>
    </>
  );
}

export default RestaurantPage;
