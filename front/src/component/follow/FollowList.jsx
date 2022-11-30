import styled from 'styled-components';
import FollowPost from './FollowPost';
import FollowUserCard from './FollowUserCard';

const FollowListContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2vw;
  position: relative;
  &::after {
    position: absolute;
    bottom: 1vw;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 1px;
    background: #eee;
    content: '';
  }
  &:last-child::after {
    display: none;
  }

  .followList__rightside {
    flex: 1;
    > ul {
      display: flex;
    }
  }

  @media screen and (max-width: 549px) {
    padding-bottom: 3rem;
    &::after {
      bottom: 1.5rem;
    }
    .followList__rightside {
      display: none;
    }
  }
`;

function FollowList({ myFollowing }) {
  return (
    <FollowListContainer>
      <FollowUserCard myFollowing={myFollowing} />
      <div className="followList__rightside">
        <ul className="followList__posts">
          {myFollowing &&
            myFollowing.boards.map(board => (
              <FollowPost key={board.id} boards={board} />
            ))}
        </ul>
      </div>
    </FollowListContainer>
  );
}

export default FollowList;
