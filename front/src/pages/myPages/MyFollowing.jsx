import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import followDataApi from '../../api/followDataApi';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Pagination from '../../component/common/Pagination';
import FollowList from '../../component/follow/FollowList';

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

function MyFollowing() {
  const [isPending, setIsPending] = useState(true);
  const [myFollowing, setMyFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);

  useEffect(() => {
    followDataApi(currentPage, 'following')
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

export default MyFollowing;
