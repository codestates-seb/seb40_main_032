import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import followDataApi from '../../api/followDataApi';
import Pagination from '../../component/common/Pagination';
import FollowList from '../../component/follow/FollowList';

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

function MyFollowing() {
  const [myFollowing, setMyFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);

  useEffect(() => {
    followDataApi(currentPage, 'following')
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

export default MyFollowing;
