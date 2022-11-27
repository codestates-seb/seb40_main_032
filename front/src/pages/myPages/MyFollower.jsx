import React, { useEffect } from 'react';
import styled from 'styled-components';
import FollowList from '../../component/follow/FollowList';
import followDataApi from '../../api/followDataApi';
import Pagination from '../../component/common/Pagination';

const MyPageMain = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20rem;

  .follower__container {
    width: 100%;
    max-width: 172rem;
    margin: 5rem 3rem 0;
  }
`;

function MyFollower() {
  useEffect(() => {
    followDataApi(1, 'follower')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <MyPageMain>
        <section className="follower__container">
          <FollowList />
          <FollowList />
          <FollowList />
        </section>
      </MyPageMain>
      <Pagination />
    </>
  );
}

export default MyFollower;
