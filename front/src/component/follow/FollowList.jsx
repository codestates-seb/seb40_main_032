import styled from 'styled-components';
import { DefaultButton } from '../common/button/ButtonStyle';
import FollowPost from './FollowPost';

const FollowListContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10rem;
  position: relative;
  &::after {
    position: absolute;
    bottom: -5rem;
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
    margin: 0 5rem 0 1.2rem;
    flex-basis: 10%;
    .followList__userinfo {
      display: flex;
      flex-direction: column;
      align-items: center;

      .followList__avatar {
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
        background: #eee;
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
    flex-basis: 90%;
    > ul {
      display: flex;
    }
  }
`;

function FollowList() {
  return (
    <FollowListContainer>
      <div className="followList__leftside">
        <ul className="followList__userinfo">
          <li className="followList__avatar">
            {/* <img src={} alt='아바타'/> */}
          </li>
          <li className="followList__username">
            <p>남극에서온펭귄</p>
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
          <FollowPost />
          <FollowPost />
          <FollowPost />
          <FollowPost />
          <FollowPost />
        </ul>
      </div>
    </FollowListContainer>
  );
}

export default FollowList;
