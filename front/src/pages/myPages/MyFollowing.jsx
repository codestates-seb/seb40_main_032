import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import followDataApi from '../../api/followDataApi';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Pagination from '../../component/common/Pagination';
import FollowList from '../../component/follow/FollowList';

const MyPageMain = styled.main`
  padding-top: 22rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 3rem 3rem;

  .following__container {
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
    padding-top: 15rem;
    margin-bottom: 1rem;
  }
`;

function MyFollowing() {
  const [isPending, setIsPending] = useState(true);
  const [myFollowing, setMyFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);
  const { accountId } = useParams();

  useEffect(() => {
    followDataApi(accountId, currentPage, 'following')
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
        <section className="following__container">
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

export default MyFollowing;
