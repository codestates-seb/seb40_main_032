import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const useIntersect = (api, size, setPosts, setIsPending) => {
  const target = useRef(null);
  const page = useRef(1);
  const [hasNextPage, SetHasNextPage] = useState(true);

  const getData = useCallback(async () => {
    try {
      setIsPending(true);
      const { data } = await axios(`${api}size=${size}&page=${page.current}`);
      setPosts(prev => [...prev, ...data.content]);
      setIsPending(false);
      SetHasNextPage(data.hasNext);
      if (data.hasNext) {
        page.current += 1;
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        getData();
      }
    });
    if (target.current && hasNextPage) {
      io.observe(target.current);
    }
    return () => io.disconnect();
  }, [hasNextPage]);

  return target;
};

export default useIntersect;
