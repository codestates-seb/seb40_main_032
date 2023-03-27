import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

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
        const { data } = await axios(
          `${api}${
            search !== '' ? `query=${encodeURIComponent(search)}&` : ''
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
    return () => io.disconnect();
  }, [hasNextPage, sort, query, lastData]);

  return [target, SetHasNextPage, setLastData];
};

export default useIntersect;
