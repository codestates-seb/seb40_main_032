import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainTheme from '../../component/main/MainTheme';
import Footer from '../../component/common/footer/Footer';

const Main = styled.main`
  padding: 8rem 0 4rem;
  @media screen and (max-width: 549px) {
    padding-top: 6rem;
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
      padding-top: 4rem;
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
        margin: 0 1rem;
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
    <>
      <Main>
        <MainTheme />
        <section className="main__wrapper">
          <Outlet />
        </section>
      </Main>
      <Footer />
    </>
  );
}

export default MainPage;
