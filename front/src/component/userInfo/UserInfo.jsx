import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfoTab from './UserInfoTab';
import UserInfoCard from './UserInfoCard';
import userDataApi from '../../api/userDataApi';

const UserWrapper = styled.div`
  position: fixed;
  display: flex;
  background: #fff;
  z-index: 9;
  justify-content: center;
  flex-direction: column;
  height: 20rem;
  width: 100%;
`;

function UserInfo() {
  const [myProfile, setMyProfile] = useState({
    email: '',
    nickname: '',
    intro: '',
    profile: '',
    following: '',
    follower: '',
  });

  // 내 정보 불러오기
  useEffect(() => {
    userDataApi()
      .then(res =>
        setMyProfile({
          email: res.data.email,
          nickname: res.data.nickname,
          intro: res.data.intro,
          profile: res.data.profile,
          following: res.data.following,
          follower: res.data.follower,
        }),
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <UserWrapper>
      <UserInfoCard userdata={myProfile} />
      <UserInfoTab userdata={myProfile} />
    </UserWrapper>
  );
}

export default UserInfo;
