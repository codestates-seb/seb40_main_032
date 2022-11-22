import styled from 'styled-components';

const Avatar = styled.img`
  background-color: var(--holder-base-color);
  border-radius: 50%;
  width: 7.8rem;
  height: 7.8rem;
  min-width: 7.8rem;
  min-height: 7.8rem;
  display: flex;
  flex-direction: column;
  object-fit: fill;
`;

function UserInfoAvatar({ profileimg }) {
  return <Avatar src={profileimg} />;
}

export default UserInfoAvatar;
