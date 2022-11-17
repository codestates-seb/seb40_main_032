import styled from 'styled-components';
import PostDetailPhoto from './PostDetailPhoto';
import PostDetailArticle from './PostDetailArticle';

const Container = styled.main`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 15rem;
  @media screen and (max-width: 549px) {
    flex-direction: column;
    align-items: center;
    margin-top: 10rem;
  }
`;

function PostDetailMain() {
  return (
    <Container>
      <PostDetailPhoto />
      <PostDetailArticle />
    </Container>
  );
}

export default PostDetailMain;
