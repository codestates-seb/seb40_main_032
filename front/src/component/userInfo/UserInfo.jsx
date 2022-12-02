import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
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

  @media screen and (max-width: 549px) {
    height: 15rem;
    top: 6rem;
  }
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
  const { accountId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userDataApi(accountId)
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
      .catch(err => {
        console.log(err);
        navigate('../../*');
      });
  }, [accountId]);

  return (
    <UserWrapper>
      <UserInfoCard userdata={myProfile} />
      <UserInfoTab userdata={myProfile} />
    </UserWrapper>
  );
}

export default UserInfo;
