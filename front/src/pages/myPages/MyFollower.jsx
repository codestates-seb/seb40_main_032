import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FollowList from '../../component/follow/FollowList';
import followDataApi from '../../api/followDataApi';
import Pagination from '../../component/common/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);
  const { accountId } = useParams();

  useEffect(() => {
    followDataApi(accountId, currentPage, 'follower')
      .then(res => {
        setMyFollowing(res.data.content);
        setTotalLists(res.data.totalElements);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

  return (
    <>
      <MyPageMain>
        {myFollowing.map(following => (
          <FollowList key={following.id} myFollowing={following} />
        ))}
      </MyPageMain>
      <Pagination
        totalLists={totalLists}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default MyFollower;
