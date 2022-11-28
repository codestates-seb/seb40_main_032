import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowList from '../../component/follow/FollowList';
import followDataApi from '../../api/followDataApi';

const MyPageMain = styled.main`
  padding-top: 22rem;
  max-width: 172rem;
  margin: 0 3rem;
  width: 90%;

  @media screen and (max-width: 549px) {
    padding-top: 15rem;
    margin: 0 1rem;
  }
`;

function MyFollower() {
  const [myFollowing, setMyFollowing] = useState([]);
  useEffect(() => {
    followDataApi(1, 'follower')
      .then(res => {
        return setMyFollowing(res.data.content);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <MyPageMain>
      {myFollowing.map(following => (
        <FollowList key={following.id} myFollowing={following} />
      ))}
    </MyPageMain>
  );
}

export default MyFollower;
