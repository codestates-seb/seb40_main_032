import styled from 'styled-components';
import UserInfoTab from './UserInfoTab';
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
        <UserInfoTab />
      </Container>
    </Wrapper>
  );
}

export default UserInfo;
