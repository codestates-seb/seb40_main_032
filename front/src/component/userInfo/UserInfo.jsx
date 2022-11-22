import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfoTab from './UserInfoTab';
import UserInfoCard from './UserInfoCard';
import loginUserApi from '../../api/loginUserApi';

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
    loginUserApi()
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
    <Wrapper>
      <Container>
        <UserInfoCard userdata={myProfile} />
        <UserInfoTab userdata={myProfile} />
      </Container>
    </Wrapper>
  );
}

export default UserInfo;
