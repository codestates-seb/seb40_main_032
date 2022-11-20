import styled from 'styled-components';
import CommentWrite from './CommentWrite';
import CommentDetail from './CommentDetail';

const CommentWrapper = styled.section`
  width: 100%;
  height: 100%;
  border: 1px solid var(--holder-base-color);
  border-radius: var(--radius-10);
  margin: 0 auto;
  max-height: 39rem;
  overflow: auto;
  @media screen and (max-width: 549px) {
    border: none;
  }
`;

function Comment() {
  return (
    <CommentWrapper className="comment">
      <CommentWrite />
      <CommentDetail />
    </CommentWrapper>
  );
}

export default Comment;
