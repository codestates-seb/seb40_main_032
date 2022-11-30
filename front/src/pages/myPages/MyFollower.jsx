import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FollowList from '../../component/follow/FollowList';
import followDataApi from '../../api/followDataApi';
import Pagination from '../../component/common/Pagination';
import LoadingSpinner from '../../component/common/LoadingSpinner';

const MyPageMain = styled.main`
  padding-top: 22rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 3rem 3rem;

  .follower__container {
    width: 100%;
    max-width: 172rem;
  }

  .loading__container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }

  @media screen and (max-width: 549px) {
    padding-top: 15.5rem;
    margin-bottom: 1rem;
  }
`;

function MyFollower() {
  const [isPending, setIsPending] = useState(true);
  const [myFollowing, setMyFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);
  const { accountId } = useParams();

  useEffect(() => {
    followDataApi(accountId, currentPage, 'follower')
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
        <section className="follower__container">
          {isPending ? (
            <div className="loading__container">
              <LoadingSpinner />
            </div>
          ) : (
            myFollowing.map(following => (
              <FollowList key={following.id} myFollowing={following} />
            ))
          )}
        </section>
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
