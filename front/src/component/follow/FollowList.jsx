import styled from 'styled-components';
import { BsCamera } from 'react-icons/bs';
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

      .followList__empty {
        width: 100%;
        display: flex;
        justify-content: center;
        > div {
          display: flex;
          font-size: 3rem;
          color: var(--holder-base-color);
          > span {
            position: relative;
            display: block;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            border: 1px solid var(--holder-base-color);
            margin-right: 1rem;
            > svg {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
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
  console.log(myFollowing.boards);
  return (
    <FollowListContainer>
      <FollowUserCard myFollowing={myFollowing} />
      <div className="followList__rightside">
        <ul className="followList__posts">
          {myFollowing.boards.length !== 0 ? (
            myFollowing.boards.map(board => (
              <FollowPost key={board.id} boards={board} />
            ))
          ) : (
            <li className="followList__empty">
              <div>
                <span>
                  <BsCamera />
                </span>
                <p>스토리가 없습니다.</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </FollowListContainer>
  );
}

export default FollowList;
