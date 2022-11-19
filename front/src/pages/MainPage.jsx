import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import MainContents from '../component/main/MainContents';
import MainTheme from '../component/main/MainTheme';

const Main = styled.main`
  padding: 8rem 0 4rem;
`;

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [extraPage, setExtraPage] = useState(true);
  const page = useRef(1);

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

  return (
    <Main>
      <MainTheme />
      <MainContents
        axiosData={axiosData}
        isPending={isPending}
        extraPage={extraPage}
        posts={posts}
      />
    </Main>
  );
}

export default MainPage;
