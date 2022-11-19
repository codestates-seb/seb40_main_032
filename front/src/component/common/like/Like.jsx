import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import like from '../../../assets/like_icon.svg';

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  .like__ment {
    font-size: ${props => props.size};
    color: ${props => props.color};
  }
`;

const LikeImg = styled(AiFillHeart)`
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => (props.color ? props.color : `#FFFFFF`)};
  stroke: ${props => (props.color ? '' : `var(--font-tag-color)`)};
  stroke-width: 60px;
  margin-right: ${props => props.marginright};
  cursor: pointer;
`;

function Like({ width, height, color, ment, size, marginright }) {
  return (
    <LikeWrapper className="like" size={size} color={color}>
      <LikeImg
        src={like}
        alt="좋아요"
        width={width}
        height={height}
        color={color}
        marginright={marginright}
      />
      <p className="like__ment">{ment}</p>
    </LikeWrapper>
  );
}

export default Like;
