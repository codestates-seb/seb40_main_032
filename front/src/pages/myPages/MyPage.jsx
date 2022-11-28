import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import UserInfo from '../../component/userInfo/UserInfo';

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem 0 0 0;
  align-items: center;
`;

function MyPage() {
  return (
    <MyPageWrapper>
      <UserInfo />
      <Outlet />
    </MyPageWrapper>
  );
}

export default MyPage;
