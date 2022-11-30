import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginModalActions } from '../../redux/loginModalSlice';
import { DefaultButton, NegativeButton } from '../common/button/ButtonStyle';
import { postDetailFollowApi } from '../../api/postDetailApi';
import { getCookie } from '../../util/cookie';

const FollowListLeftSide = styled.div`
  padding: 0 4rem 0 2rem;

  .followList__userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4.5rem 0;

    .followList__avatar {
      width: 12rem;
      height: 12rem;
      border-radius: 50%;
      background: #eee;
      overflow: hidden;
      > a > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

    .followList__button {
      > button {
        font-size: 1.4rem;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .followList__userinfo {
      padding: 3.5rem 0;

      .followList__avatar {
        width: 10rem;
        height: 10rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .followList__userinfo {
      .followList__avatar {
        width: 9rem;
        height: 9rem;
      }
    }
  }

  @media screen and (max-width: 549px) {
    width: 100%;
    padding: 0 1.5rem;
    .followList__userinfo {
      width: 100%;
      flex-direction: row;
      padding: 0;
      .followList__avatar {
        width: 6rem;
        height: 6rem;
      }
      .followList__username {
        padding-left: 1rem;
        margin: 0;
      }

      .followList__button {
        flex-grow: 2;
        display: flex;
        justify-content: flex-end;
        > button {
          width: 7rem;
          height: 2.5rem;
          font-size: 1.2rem;
        }
      }
    }
  }
`;

function FollowUserCard({ myFollowing }) {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.login.isLogin);
  const cookieAccountId = Number(getCookie('accountId'));
  console.log(cookieAccountId, myFollowing.id);

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
          {cookieAccountId === myFollowing.id ? (
            <div />
          ) : !myFollowing.follow ? (
            <DefaultButton width="9rem" height="3rem" onClick={followHandler}>
              팔로우
            </DefaultButton>
          ) : (
            <NegativeButton width="9rem" height="3rem" onClick={followHandler}>
              팔로우중
            </NegativeButton>
          )}
        </li>
      </ul>
    </FollowListLeftSide>
  );
}

export default FollowUserCard;
