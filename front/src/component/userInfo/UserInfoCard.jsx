import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie } from '../../util/cookie';
import UserInfoAvatar from './UserInfoAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  > div {
    display: flex;
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 0 2rem;
  gap: 5px;
  > div {
    display: flex;
    width: 100%;
    > h1 {
      margin-right: 1rem;

      @media screen and (max-width: 549px) {
        font-size: 1.5rem;
      }
    }
  }
  > p {
    text-align: start;
  }
`;

const EditButton = styled(Link)`
  color: var(--button-theme);
  text-decoration: none;
  cursor: pointer;
  &:active {
    font-weight: var(--font-semi-bold);
  }
`;

function UserInfoCard({ userdata }) {
  const { accountId } = useParams();
  const cookieAccountId = getCookie('accountId');

  return (
    <Container>
      <div>
        <UserInfoAvatar profileimg={userdata.profile} />
        <UserInfoText>
          <div>
            <h1>{userdata.nickname}</h1>
            {accountId === cookieAccountId && (
              <EditButton to="/myinfoedit">내 정보수정</EditButton>
            )}
          </div>
          <h5>{userdata.email}</h5>
          <p>{userdata.intro}</p>
        </UserInfoText>
      </div>
    </Container>
  );
}

export default UserInfoCard;
