import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

// 사용법: 반환되는 target을 옵저버의 target으로 하고자하는 요소의 ref 값에 할당
// 파라미터 설명
// api: 슬래시(/)부터 size 전까지의 특수문자(& or ?)까지 모두 포함
// size: 요청당 원하는 데이터 개수
// setPosts: 받아온 데이터를 state값으로 바꿔줄 setState함수
// setIsPending: pending state를 바꿔줄 setState함수
// threshold(default는 0): 지정한 root(default는 뷰포트)에 target이 얼마나 보이는지 비율(0~1)
const useIntersect = (
  api,
  size,
  setPosts,
  setIsPending,
  threshold = 0,
  sort = 'createdAt',
) => {
  const target = useRef(null);
  const page = useRef(1);
  const [hasNextPage, SetHasNextPage] = useState(true);

  const getData = useCallback(async () => {
    try {
      setIsPending(true);
      console.log(`${api}size=${size}&page=${page.current}&sort=${sort}`);
      const { data } = await axios(
        `${api}size=${size}&page=${page.current}&sort=${sort}`,
      );
      setPosts(prev => [...prev, ...data.content]);
      setIsPending(false);
      SetHasNextPage(data.hasNext);
      if (data.hasNext) {
        page.current += 1;
      } else {
        target.current.style.display = 'none';
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  }, [sort]);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getData();
        }
      },
      { threshold },
    );
    if (target.current && hasNextPage) {
      io.observe(target.current);
    }
    return () => io.disconnect();
  }, [hasNextPage, sort]);

  return [target, page, SetHasNextPage];
};

export default useIntersect;
