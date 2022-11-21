import styled from 'styled-components';
import MainContents from '../component/main/MainContents';
import MainTheme from '../component/main/MainTheme';

const Main = styled.main`
  padding: 8rem 0 4rem;
`;

function MainPage() {
  return (
    <Main>
      <MainTheme />
      <MainContents />
    </Main>
  );
}

export default MainPage;
