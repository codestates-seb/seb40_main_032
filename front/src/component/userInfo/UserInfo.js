import styled from 'styled-components';
import UserInfoTabNav from './UserInfoTab';
import UserInfoCard from './UserInfoCard';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 8rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 20rem;
`;

function UserInfo() {
  return (
    <Wrapper>
      <Container>
        <UserInfoCard />
        <UserInfoTabNav />
      </Container>
    </Wrapper>
  );
}

export default UserInfo;
