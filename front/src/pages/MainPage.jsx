import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainTheme from '../component/main/MainTheme';

const Main = styled.main`
  padding: 8rem 0 4rem;

  .main__wrapper {
    width: 100%;
    padding: 5rem 0;
    position: relative;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 549px) {
      padding: 0;
      padding-top: 5rem;
    }

    .main__container {
      max-width: 172rem;
      margin: 0 3rem;
      display: flex;
      flex-wrap: wrap;

      @media screen and (max-width: 1440px) {
        .post,
        .post__skeleton {
          flex-basis: 25%;
        }
      }

      @media screen and (max-width: 1024px) {
        .post,
        .post__skeleton {
          flex-basis: 33.3%;
        }
      }

      @media screen and (max-width: 768px) {
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
  }
`;

function MainPage() {
  return (
    <Main>
      <MainTheme />
      <section className="main__wrapper">
        <Outlet />
      </section>
    </Main>
  );
}

export default MainPage;
