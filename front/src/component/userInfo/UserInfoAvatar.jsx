import styled from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';

const Avatar = styled.div`
  > span {
    background-color: var(--holder-base-color);
    display: block;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media screen and (max-width: 549px) {
    > span {
      width: 7.5rem;
      height: 7.5rem;
    }
  }
`;

const DefaultImage = styled(BiUserCircle)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function UserInfoAvatar({ profileimg }) {
  return (
    <Avatar>
      <span>
        {profileimg ? (
          <img src={profileimg} alt="프로필이미지" />
        ) : (
          <DefaultImage size="4.3rem" />
        )}
      </span>
    </Avatar>
  );
}

export default UserInfoAvatar;
