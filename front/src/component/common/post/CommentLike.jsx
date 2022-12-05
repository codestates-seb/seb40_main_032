import { BiHeart, BiMessageDetail } from 'react-icons/bi';
import styled from 'styled-components';

const CommentLikeBox = styled.div``;

function CommentLike() {
  return (
    <CommentLikeBox>
      <ul>
        <li>
          <BiHeart />
          <span>243k</span>
        </li>
        <li>
          <BiMessageDetail />
          <span>2434k</span>
        </li>
      </ul>
    </CommentLikeBox>
  );
}

export default CommentLike;
