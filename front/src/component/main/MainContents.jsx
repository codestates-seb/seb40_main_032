import styled from 'styled-components';
import Post from '../common/Post';
import MainSort from './MainSort';

const MainContainer = styled.section`
  width: 100%;
  padding: 5rem calc(10rem - 1.2rem);
  position: relative;

  @media screen and (max-width: 549px) {
    padding: 0;
    padding-top: 5rem;
  }

  .main__container {
    max-width: 172rem;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 1440px) {
      .post,
      .post__skeleton {
        flex-basis: 33.3%;
      }
    }

    @media screen and (max-width: 1024px) {
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
`;

function MainContents() {
  return (
    <MainContainer>
      <MainSort />
      <div className="main__container">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </MainContainer>
  );
}

export default MainContents;
