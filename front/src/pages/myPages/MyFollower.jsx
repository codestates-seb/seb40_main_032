import React, { useEffect, useState } from 'react';
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
  const [followerList, setFollowerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLists, setTotalLists] = useState(0);

  useEffect(() => {
    followDataApi(currentPage, 'follower')
      .then(res => {
        setFollowerList(res.data.content);
        setTotalLists(res.data.totalElements);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

  return (
    <>
      <MyPageMain>
        <section className="follower__container">
          {followerList.map(list => (
            <FollowList key={list.id} list={list} />
          ))}
        </section>
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
