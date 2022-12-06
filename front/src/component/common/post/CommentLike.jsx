import { BiHeart, BiMessageDetail } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import styled from 'styled-components';

const CommentLikeBox = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  > ul {
    display: flex;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    > li {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 1.6rem;
      padding: 5px;
      > span {
        font-size: 1.4rem;
        font-weight: 300;
        padding-left: 2px;
      }
    }
  }
`;

function CommentLike({ view, like, comment }) {
  const viewCount = new Intl.NumberFormat('en-US', {
    notation: 'compact',
  }).format(view);
  const likeCount = new Intl.NumberFormat('en-US', {
    notation: 'compact',
  }).format(like);
  const commentCount = new Intl.NumberFormat('en-US', {
    notation: 'compact',
  }).format(comment);

  return (
    <CommentLikeBox>
      <ul>
        <li className="post__like">
          <BiHeart />
          <span>{likeCount}</span>
        </li>
        <li className="post__comment">
          <BiMessageDetail />
          <span>{commentCount}</span>
        </li>
        <li className="post__view">
          <AiOutlineEye />
          <span>{viewCount}</span>
        </li>
      </ul>
    </CommentLikeBox>
  );
}

export default CommentLike;
