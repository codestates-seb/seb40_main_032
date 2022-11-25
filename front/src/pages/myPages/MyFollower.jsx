import styled from 'styled-components';
import FollowList from '../../component/follow/FollowList';

const MyPageMain = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20rem;

  .follower__container {
    width: 100%;
    max-width: 172rem;
    margin: 5rem 3rem;
  }
`;

function MyFollower() {
  return (
    <MyPageMain>
      <section className="follower__container">
        <FollowList />
        <FollowList />
        <FollowList />
      </section>
    </MyPageMain>
  );
}

export default MyFollower;
