import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginModalActions } from '../../redux/loginModalSlice';
import { DefaultButton, NegativeButton } from '../common/button/ButtonStyle';
import { postDetailFollowApi } from '../../api/postDetailApi';

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
      > a > img {
        width: 100%;
        height: 100%;
      }
    }

    .followList__username {
      margin: 1rem 0 2rem;
      > a > p {
        color: var(--font-base-black);
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
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.login.isLogin);
  console.log(myFollowing);
  console.log('로그인여부', isLogin);

  const followHandler = () => {
    if (isLogin) {
      postDetailFollowApi(myFollowing.id);
      window.location.reload();
    } else {
      dispatch(loginModalActions.openLoginModal());
    }
  };

  return (
    <FollowListLeftSide>
      <ul className="followList__userinfo">
        <li className="followList__avatar">
          <Link to={`/mypage/mypost/${myFollowing.id}`}>
            <img src={myFollowing.profile} alt="아바타" />
          </Link>
        </li>
        <li className="followList__username">
          <Link to={`/mypage/mypost/${myFollowing.id}`}>
            <p>{myFollowing.nickname}</p>
          </Link>
        </li>
        <li className="followList__button">
          {!myFollowing.follow ? (
            <DefaultButton width="9rem" height="3rem" onClick={followHandler}>
              팔로우
            </DefaultButton>
          ) : (
            <NegativeButton width="9rem" height="3rem" onClick={followHandler}>
              언팔로우
            </NegativeButton>
          )}
        </li>
      </ul>
    </FollowListLeftSide>
  );
}

export default FollowUserCard;
