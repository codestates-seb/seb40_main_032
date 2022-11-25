import React, { useEffect } from 'react';
import styled from 'styled-components';
import followDataApi from '../../api/followDataApi';

const MyPageMain = styled.main`
  padding-top: 23rem;
  max-width: 172rem;
  margin: 0 3rem;
`;

function MyFollower() {
  useEffect(() => {
    followDataApi(1, 'follower')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);
  return <MyPageMain>MyFollower</MyPageMain>;
}

export default MyFollower;
