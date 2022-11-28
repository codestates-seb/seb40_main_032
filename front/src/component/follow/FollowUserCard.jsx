import React from 'react';
import { DefaultButton, NegativeButton } from '../common/button/ButtonStyle';

function FollowUserCard({ myFollowing }) {
  return (
    <div className="followList__leftside">
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
    </div>
  );
}

export default FollowUserCard;
