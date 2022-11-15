import styled from 'styled-components';
import Post from '../common/Post';
import MainSort from './MainSort';

const MainContainer = styled.section`
  width: 100%;
  padding: 0 calc(10rem - 1.2rem);
  position: relative;

  @media screen and (max-width: 549px) {
    padding: 0;
  }

  .main__container {
    max-width: 172rem;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 1440px) {
      .post {
        flex-basis: 33.3%;
      }
    }

    @media screen and (max-width: 1024px) {
      .post {
        flex-basis: 50%;
      }
    }

    @media screen and (max-width: 549px) {
      .post {
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
