import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RiUserFollowLine } from 'react-icons/ri';
import FollowList from '../../component/follow/FollowList';
import followDataApi from '../../api/followDataApi';
import Pagination from '../../component/common/Pagination';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import EmptyText from '../../component/common/EmptyText';

const MyPageMain = styled.main`
  padding-top: 22rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 3rem 3rem;

  .follower__container {
    width: 100%;
    max-width: 172rem;

    .loading__container {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 1rem;
    }

    .empty__follower {
      width: 100%;
      height: calc(100vh - 8rem - 22rem - 3rem - 10.1rem);
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        padding-bottom: 3rem;
      }
    }
  }

  @media screen and (max-width: 549px) {
    padding-top: 15.5rem;
    margin-bottom: 1rem;

    .empty__follower {
      height: calc(100vh - 8rem - 16.5rem - 16.6rem);
      > div {
        font-size: 2rem;
        > span {
          width: 4rem;
          height: 4rem;
        }
      }
    }
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
          {!isPending && myFollowing.length === 0 && (
            <div className="empty__follower">
              <EmptyText
                icon={<RiUserFollowLine />}
                text="팔로워 회원이 없습니다."
              />
            </div>
          )}
        </section>
      </MyPageMain>
      {!isPending && myFollowing.length !== 0 && (
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
