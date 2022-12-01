import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainTheme from '../../component/main/MainTheme';
import FixedFooter from '../../component/common/footer/FixedFooter';

const Main = styled.main`
  padding: 8rem 0 4rem;
  @media screen and (max-width: 549px) {
    padding-top: 6rem;
  }

  .search__sort {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    max-width: 172rem;
  }
  .search__result {
    font-size: 1.6rem;
    width: 100%;
    font-weight: 400;
    margin-left: 2rem;
  }

  .main__wrapper {
    width: 100%;
    padding: 5rem 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 549px) {
      padding: 0;
      padding-top: 7.5rem;
      .search__result {
        display: none;
      }
    }

    .main__container {
      max-width: 172rem;
      margin: 0 3rem;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

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
        margin: 0 1rem;
        .post,
        .post__skeleton {
          flex-basis: 100%;
        }
      }
    }
  }
  .target {
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
  }
`;

function MainPage() {
  return (
    <>
      <Main>
        <MainTheme />
        <section className="main__wrapper">
          <Outlet />
        </section>
      </Main>
      <FixedFooter />
    </>
  );
}

export default MainPage;
