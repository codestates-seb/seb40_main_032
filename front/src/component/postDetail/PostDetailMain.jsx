import styled from 'styled-components';
import PostDetailPhoto from './PostDetailPhoto';
import PostDetailArticle from './PostDetailArticle';
import Comment from './comment/Comment';

const Container = styled.main`
  height: 100%;
  margin-top: 8rem;
  padding-top: 8rem;
  .detail__container {
    margin: 0 auto;
    padding-inline-start: 10rem;
    padding-inline-end: 10rem;
    max-width: 160rem;
  }
  .detail__body {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .detail__comment {
    padding-bottom: 2rem;
  }
  @media screen and (max-width: 549px) {
    padding-top: 4rem;
    .detail__container {
      padding-inline-start: 2rem;
      padding-inline-end: 2rem;
    }
    .detail__body {
      flex-direction: column;
      align-items: center;
    }
  }
`;

function PostDetailMain() {
  return (
    <Container>
      <div className="detail__container">
        <div className="detail__body">
          <PostDetailPhoto />
          <PostDetailArticle />
        </div>
        <div className="detail__comment">
          <Comment />
        </div>
      </div>
    </Container>
  );
}

export default PostDetailMain;
