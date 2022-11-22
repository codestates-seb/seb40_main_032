import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

const MainThemeBar = styled.div`
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background: #fff;
  display: flex;
  justify-content: center;

  .theme__lists {
    display: flex;
    justify-content: center;
    position: relative;
    > li {
      margin: 0 2rem;
      color: var(--font-base-grey);

      > button {
        height: 5rem;
        background: none;
        border: none;
        display: flex;
        > a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          color: var(--font-base-grey);
          > svg {
            width: 2rem;
            height: 2rem;
          }

          > span {
            font-size: 1.6rem;
            padding-left: 5px;
          }
        }
      }

      &.active > button > a {
        color: var(--font-base-black);
        > svg {
          fill: var(--button-theme);
        }
      }
    }

    .bar {
      position: absolute;
      bottom: 0;
      width: 8rem;
      height: 3px;
      margin: 0;
      background: var(--button-theme);
      opacity: 0;
      transition: all 0.5s;
    }

    .theme__all.active ~ .bar {
      left: 1.1rem;
      opacity: 1;
    }

    .theme__restaurant.active ~ .bar {
      left: 10.4rem;
      opacity: 1;
    }

    .theme__hotel.active ~ .bar {
      left: 19.6rem;
      opacity: 1;
    }

    .theme__trip.active ~ .bar {
      left: 29.7rem;
      opacity: 1;
    }
  }
`;

// const Container = styled.div`
//   color: var(--font-base-black);
//   width: 100%;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
// `;

// const Tab = styled(Link)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-decoration: none;
//   color: inherit;
//   padding: 10px;
//   &.isActive,
//   &:hover {
//     transition: 0.3s linear;
//     border-bottom: 2px solid var(--font-base-grey);
//   }
// `;

const CircleIcon = styled.div`
  background-color: var(--font-tag-color);
  color: var(--base-white-color);
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const HeartIcon = styled(AiFillHeart)`
  color: var(--font-tag-color);
  width: 2rem;
  height: 2rem;
`;

function UserInfoTab({ userdata }) {
  const { pathname } = useLocation();

  // 임시 데이터
  const [posts] = useState(['내글1', '내글2']);

  // const tabItems = [
  //   {
  //     title: '게시글',
  //     link: '/',
  //     icon: <CircleIcon>{posts.length}</CircleIcon>,
  //   },
  //   { title: '좋아요', link: '/', icon: <HeartIcon /> },
  //   {
  //     title: '팔로워',
  //     link: '/',
  //     icon: <CircleIcon>{userdata.follower}</CircleIcon>,
  //   },
  //   {
  //     title: '팔로잉',
  //     link: '/',
  //     icon: <CircleIcon>{userdata.folloing}</CircleIcon>,
  //   },
  // ];

  return (
    <MainThemeBar>
      <ul className="theme__lists">
        <li
          className={
            pathname === '/mypage' ? 'theme__all active' : 'theme__all'
          }
        >
          <button>
            <Link to="/mypage">
              <CircleIcon>{posts.length}</CircleIcon>
              <span>게시글</span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/mypage/mylikes'
              ? 'theme__restaurant active'
              : 'theme__restaurant'
          }
        >
          <button>
            <Link to="/mypage/mylikes">
              <HeartIcon />
              <span>좋아요</span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/mypage/myfollower'
              ? 'theme__hotel active'
              : 'theme__hotel'
          }
        >
          <button>
            <Link to="/mypage/myfollower">
              <CircleIcon>{userdata.follower}</CircleIcon>
              <span>팔로워 </span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/mypage/myfollowing'
              ? 'theme__trip active'
              : 'theme__trip'
          }
        >
          <button>
            <Link to="/mypage/myfollowing">
              <CircleIcon>{userdata.folloing}</CircleIcon>
              <span>팔로잉</span>
            </Link>
          </button>
        </li>
        <li className="bar" />
      </ul>
    </MainThemeBar>
  );
}

export default UserInfoTab;
