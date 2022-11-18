import styled from 'styled-components';
import CommentMore from './CommentMore';

const WriteWrapper = styled.article`
  width: 90%;
  height: 100%;
  border-radius: var(--radius-10);
  margin: 2rem auto 1rem auto;
  position: relative;
  .comment__input {
    width: 100%;
    border: 1px solid var(--font-base-grey);
    border-radius: var(--radius-10);
    outline: none;
    height: 6.6rem;
    padding-left: 5.9rem;
    font-size: 2rem;
  }

  .comment__button {
    position: absolute;
    top: 1.4rem;
    right: 5rem;
    border: none;
    background-color: transparent;
    color: var(--button-theme);
    font-size: 2.5rem;
    font-weight: 800;
    cursor: pointer;
  }

  @media screen and (max-width: 549px) {
    width: 100%;
    .comment__input {
      font-size: 1.5rem;
      height: 5.5rem;
    }
    .comment__button {
      font-size: 1.5rem;
    }
  }
`;

function CommentWrite() {
  return (
    <WriteWrapper className="comment__write">
      <input className="comment__input" placeholder="댓글을 입력 해주세요" />
      <button className="comment__button">등록</button>
      <CommentMore />
      <CommentMore />
    </WriteWrapper>
  );
}

export default CommentWrite;
