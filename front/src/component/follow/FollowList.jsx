import styled from 'styled-components';
import { DefaultButton } from '../common/button/ButtonStyle';
import FollowPost from './FollowPost';

const FollowListContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4vw;
  position: relative;
  &::after {
    position: absolute;
    bottom: 2vw;
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

  .followList__leftside {
    padding: 0 5rem 0 1.2rem;

    @media screen and (max-width: 549px) {
      padding-right: 1.2rem;
    }
    .followList__userinfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5rem 0;

      .followList__avatar {
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
        background: #eee;
        overflow: hidden;
        > img {
          width: 100%;
          height: 100%;
        }
      }

      .followList__username {
        margin: 1rem 0 2rem;
        > p {
          font-size: 1.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
  }

  .followList__rightside {
    flex: 1;
    > ul {
      display: flex;
    }
  }
`;

function FollowList({ myFollowing }) {
  console.log(myFollowing);
  return (
    <FollowListContainer>
      <div className="followList__leftside">
        <ul className="followList__userinfo">
          <li className="followList__avatar">
            <img src={myFollowing.profile} alt="아바타" />
          </li>
          <li className="followList__username">
            <p>{myFollowing.nickname}</p>
          </li>
          <li className="followList__button">
            <DefaultButton width="9rem" height="3rem">
              팔로우
            </DefaultButton>
          </li>
        </ul>
      </div>
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
