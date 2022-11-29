import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowList from '../../component/follow/FollowList';
import followDataApi from '../../api/followDataApi';
import Pagination from '../../component/common/Pagination';
import LoadingSpinner from '../../component/common/LoadingSpinner';

const MyPageMain = styled.main`
  padding-top: 22rem;
  max-width: 172rem;
  margin: 0 3rem;
  width: 90%;

  .loading__container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }

  @media screen and (max-width: 549px) {
    padding-top: 15rem;
    margin: 0 1rem;
  }
`;

function MyFollower() {
  const [isPending, setIsPending] = useState(true);
  const [myFollowing, setMyFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);

  useEffect(() => {
    followDataApi(currentPage, 'follower')
      .then(res => {
        setMyFollowing(res.data.content);
        setTotalLists(res.data.totalElements);
        setIsPending(false);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

  return (
    <>
      <MyPageMain>
        {isPending ? (
          <div className="loading__container">
            <LoadingSpinner />
          </div>
        ) : (
          myFollowing.map(following => (
            <FollowList key={following.id} myFollowing={following} />
          ))
        )}
      </MyPageMain>
      {!isPending && (
        <Pagination
          totalLists={totalLists}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsPending={setIsPending}
        />
      )}
    </>
  );
}

export default MyFollower;
