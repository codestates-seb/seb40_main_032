import styled from 'styled-components';
import UserInfo from '../../component/userInfo/UserInfo';

const WrapperUserInfo = styled.div`
  padding-top: 8rem;
  padding-bottom: 20rem;
`;

function MyInfoEdit() {
  return (
    <WrapperUserInfo>
      <UserInfo />
    </WrapperUserInfo>
  );
}

export default MyInfoEdit;
