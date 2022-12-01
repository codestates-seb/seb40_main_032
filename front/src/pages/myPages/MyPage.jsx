import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../component/common/footer/Footer';
import UserInfo from '../../component/userInfo/UserInfo';

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem 0 0 0;
  align-items: center;
  min-height: 100vh;
`;

function MyPage() {
  return (
    <MyPageWrapper>
      <UserInfo />
      <Outlet />
      <Footer />
    </MyPageWrapper>
  );
}

export default MyPage;
