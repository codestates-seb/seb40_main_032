import styled from 'styled-components';
import Post from '../common/Post';
import MainSort from './MainSort';

const MainContainer = styled.section`
  width: 100%;
  padding: 0 calc(10rem - 1.2rem);
  position: relative;

  .main__container {
    max-width: 172rem;
    display: flex;
    flex-wrap: wrap;
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
