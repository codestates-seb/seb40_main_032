import React from 'react';
import styled from 'styled-components';
import { DefaultButton, NegativeButton } from '../common/button/ButtonStyle';

const FollowListLeftSide = styled.div`
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
`;

function FollowUserCard({ myFollowing }) {
  return (
    <FollowListLeftSide>
      <ul className="followList__userinfo">
        <li className="followList__avatar">
          <img src={myFollowing.profile} alt="아바타" />
        </li>
        <li className="followList__username">
          <p>{myFollowing.nickname}</p>
        </li>
        <li className="followList__button">
          {!myFollowing.follow ? (
            <DefaultButton width="9rem" height="3rem">
              팔로우
            </DefaultButton>
          ) : (
            <NegativeButton width="9rem" height="3rem">
              언팔로우
            </NegativeButton>
          )}
        </li>
      </ul>
    </FollowListLeftSide>
  );
}

export default FollowUserCard;
