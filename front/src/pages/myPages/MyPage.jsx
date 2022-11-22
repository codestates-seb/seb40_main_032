import React from 'react';
import { Outlet } from 'react-router-dom';
import UserInfo from '../../component/userInfo/UserInfo';

function MyPage() {
  return (
    <>
      <UserInfo />
      <Outlet />;
    </>
  );
}

export default MyPage;
