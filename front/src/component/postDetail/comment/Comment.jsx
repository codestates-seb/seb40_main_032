import styled from 'styled-components';
import CommentWrite from './CommentWrite';
// import CommentDetail from './CommentDetail';

const CommentWrapper = styled.section`
  width: 100%;
  height: 100%;
  border: 1px solid var(--holder-base-color);
  border-radius: var(--radius-10);
  max-height: 39rem;
  overflow: auto;
  flex-basis: 90%;
  @media screen and (max-width: 710px) {
    border: none;
    flex-basis: 100%;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  /* @media screen and (max-width: 549px) {
    border: none;
    flex-basis: 100%;
    ::-webkit-scrollbar {
      display: none;
    }
  } */
`;

function Comment() {
  return (
    <CommentWrapper className="comment">
      <CommentWrite />
      {/* <CommentDetail /> */}
    </CommentWrapper>
  );
}

export default Comment;
