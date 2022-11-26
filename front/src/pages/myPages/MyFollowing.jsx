import React, { useEffect } from 'react';
import styled from 'styled-components';
import followDataApi from '../../api/followDataApi';

const MyPageMain = styled.main`
  padding-top: 23rem;
  max-width: 172rem;
  margin: 0 3rem;
`;

function MyFollowing() {
  useEffect(() => {
    followDataApi(1, 'following')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);
  return <MyPageMain>MyFollowing</MyPageMain>;
}

export default MyFollowing;
