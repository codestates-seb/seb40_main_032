import { BiHeart, BiMessageDetail } from 'react-icons/bi';
import styled from 'styled-components';

const CommentLikeBox = styled.div``;

function CommentLike({ like, comment }) {
  console.log(like, comment);
  return (
    <CommentLikeBox>
      <ul>
        <li>
          <BiHeart />
          <span>{like}</span>
        </li>
        <li>
          <BiMessageDetail />
          <span>{comment}</span>
        </li>
      </ul>
    </CommentLikeBox>
  );
}

export default CommentLike;
