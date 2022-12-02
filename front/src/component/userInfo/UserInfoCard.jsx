import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserInfoAvatar from './UserInfoAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  > div {
    display: flex;
    margin: 0 2rem;
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  margin-left: 2rem;
  gap: 5px;

  > div > h1,
  > h5,
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  > div {
    display: flex;
    width: 100%;
    align-items: center;
    > h1 {
      margin-right: 2rem;
      font-size: 2rem;
      font-weight: 500;
    }
    > a {
      min-width: 7rem;
    }
  }

  > h5 {
    font-size: 1.6rem;
    font-weight: 400;
  }

  > p {
    text-align: start;
    font-size: 1.2rem;
    height: 2rem;
  }

  @media screen and (max-width: 549px) {
    gap: 0;

    div {
      > h1 {
        margin-right: 1rem;
        font-size: 1.6rem;
      }
      > a {
        min-width: 6rem;
      }
    }

    > h5 {
      font-size: 1.5rem;
      line-height: 1.5;
    }
  }
`;

const EditButton = styled(Link)`
  font-size: 1.4rem;
  color: var(--button-theme);
  text-decoration: none;
  cursor: pointer;
  &:active {
    font-weight: var(--font-semi-bold);
  }
  @media screen and (max-width: 549px) {
    font-size: 1.2rem;
  }
`;

function UserInfoCard({ userdata }) {
  const { accountId } = useParams();
  const cookieAccountId = localStorage.getItem('accountId');

  return (
    <Container>
      <div>
        <UserInfoAvatar profileimg={userdata.profile} />
        <UserInfoText>
          <div>
            <h1>{userdata.nickname}</h1>
            {accountId === cookieAccountId && (
              <EditButton to={`/mypage/myinfoedit/${accountId}`}>
                내 정보수정
              </EditButton>
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
