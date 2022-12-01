import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import UserInfo from '../../component/userInfo/UserInfo';
import MetaTag from '../../util/MetaTag';

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem 0 0 0;
  align-items: center;
`;

function MyPage() {
  return (
    <MyPageWrapper>
      <MetaTag
        title="마이페이지 - Tripagram"
        description="계정관리와 팔로워 와 팔로잉 좋아요를 관리하는 페이지입니다."
        keywords="계정관리, 정보수정, 팔로워 및 팔로잉 관리, 게시글 관리, 좋아요 관리"
      />
      <UserInfo />
      <Outlet />
    </MyPageWrapper>
  );
}

export default MyPage;
