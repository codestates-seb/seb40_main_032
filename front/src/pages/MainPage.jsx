import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainTheme from '../component/main/MainTheme';

const Main = styled.main`
  padding: 8rem 0 4rem;
`;

function MainPage() {
  return (
    <Main>
      <MainTheme />
      <Outlet />
    </Main>
  );
}

export default MainPage;
