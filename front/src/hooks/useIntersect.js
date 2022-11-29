import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/react';
// 사용법: 반환되는 target을 옵저버의 target으로 하고자하는 요소의 ref 값에 할당
// 파라미터 설명
// api: 슬래시(/)부터 size 전까지의 특수문자(& or ?)까지 모두 포함
// size: 요청당 원하는 데이터 개수
// setPosts: 받아온 데이터를 state값으로 바꿔줄 setState함수
// setIsPending: pending state를 바꿔줄 setState함수
// threshold(default는 0): 지정한 root(default는 뷰포트)에 target이 얼마나 보이는지 비율(0~1)
const useIntersect = (
  api,
  query,
  size,
  setPosts,
  setIsPending,
  threshold = 0,
  sort = 'createdAt,desc',
  keyword = '',
) => {
  const target = useRef(null);
  const [hasNextPage, SetHasNextPage] = useState(true);
  const [lastData, setLastData] = useState('');

  const getData = useCallback(
    async search => {
      try {
        setIsPending(true);
        console.log(
          // boardId createdAt likecounts views likeboardId
          `${api}${
            search !== '' ? `query=${search}&` : ''
          }size=${size}&sort=${sort}&${lastData}`,
        );
        const { data } = await axios(
          `${api}${
            search !== '' ? `query=${search}&` : ''
          }size=${size}&sort=${sort}&${lastData}`,
        );
        setPosts(prev => [...prev, ...data.content]);
        setIsPending(false);
        SetHasNextPage(data.hasNext);
        if (data.hasNext) {
          const last = data.content[data.content.length - 1];
          if (keyword === 'like') {
            setLastData(
              `lastLikeId=${last.likeId}&lastLikeCreatedAt=${last.likeCreatedAt}`,
            );
          } else if (sort === 'createdAt,desc') {
            setLastData(
              `lastBoardId=${last.boardId}&lastBoardCreatedAt=${last.createdAt}`,
            );
          } else if (sort === 'likeCount,desc') {
            setLastData(
              `lastBoardId=${last.boardId}&lastBoardLikeCount=${last.likeCount}`,
            );
          } else if (sort === 'views,desc') {
            setLastData(
              `lastBoardId=${last.boardId}&lastBoardViews=${last.views}`,
            );
          }
        } else {
          target.current.style.display = 'none';
        }
      } catch (err) {
        Sentry.captureException(err);
        console.log('Error', err.message);
      }
    },
    [sort, lastData],
  );

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getData(query);
        }
      },
      { threshold },
    );
    if (target.current && hasNextPage) {
      io.observe(target.current);
    }
    console.log('3');
    return () => io.disconnect();
  }, [hasNextPage, sort, query, lastData]);

  return [target, SetHasNextPage];
};

export default useIntersect;
