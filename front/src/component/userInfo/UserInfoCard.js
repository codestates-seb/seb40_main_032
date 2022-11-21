import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserInfoAvatar from './UserInfoAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--font-base-grey);
  height: 100%;
  width: 100%;
  padding: 0px 8rem;
`;

const UserInfoText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  margin: 0 2rem;
  gap: 5px;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  > p {
    text-align: start;
  }
`;

const EditButton = styled(Link)`
  display: ${props => (props.isMyPage ? 'block' : 'none')};
  color: var(--button-theme);
  text-decoration: none;
  cursor: pointer;
  &:active {
    font-weight: var(--font-semi-bold);
  }
`;

function UserInfoCard() {
  const dataTemp = {
    nickname: '닉네임',
    email: 'userEmail@gmail.com',
    body: '자기소개입니다. 글자수 제한은 얼마인가요?',
  };

  const [isMyPage] = useState(true);

  return (
    <Container>
      <UserInfoAvatar />
      <UserInfoText>
        <div>
          <h1>{dataTemp.nickname}</h1>
          <EditButton to="#" isMyPage={isMyPage || null}>
            내 정보수정
          </EditButton>
        </div>
        <h5>{dataTemp.email}</h5>
        <p>{dataTemp.body}</p>
      </UserInfoText>
    </Container>
  );
}

export default UserInfoCard;
