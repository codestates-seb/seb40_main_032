import styled from 'styled-components';
import MyInfoEditForm from '../../component/myInfoEdit/MyInfoEditForm';
import UserInfo from '../../component/userInfo/UserInfo';

const WrapperUserInfo = styled.div`
  padding-top: 8rem;
  padding-bottom: 20rem;
  @media screen and (max-width: 549px) {
    padding-bottom: 14rem;
  }
`;

function MyInfoEdit() {
  return (
    <>
      <WrapperUserInfo>
        <UserInfo />
      </WrapperUserInfo>
      <MyInfoEditForm />
    </>
  );
}

export default MyInfoEdit;
