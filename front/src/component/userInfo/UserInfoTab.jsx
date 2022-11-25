import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart, AiFillPicture } from 'react-icons/ai';

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

          > span {
            font-size: 1.7rem;
            padding-left: 5px;
          }
        }
      }

      &.active > button > a {
        color: var(--font-base-black);
      }
    }

    .bar {
      position: absolute;
      bottom: 0;
      width: 8rem;
      height: 3px;
      margin: 0;
      background: var(--font-tag-color);
      opacity: 0;
      transition: all 0.5s;
    }

    /* TODO: left 값 화면 너비에 따라 달라지게 해야할 것 같음 */
    .theme__mypost.active ~ .bar {
      left: 1.5rem;
      opacity: 1;
    }

    .theme__mylikes.active ~ .bar {
      left: 12.8rem;
      opacity: 1;
    }

    .theme__myfollower.active ~ .bar {
      left: 24.2rem;
      opacity: 1;
    }

    .theme__myfollowing.active ~ .bar {
      left: 35.7rem;
      opacity: 1;
    }
  }
  @media screen and (max-width: 549px) {
    .theme__lists > li {
      margin: 0 1rem;
      > button {
        height: 4rem;
        > a > span {
          font-size: 1.4rem;
        }
      }

      &.theme__mypost.active ~ .bar {
        width: 6rem;
        left: 1rem;
      }
      &.theme__mylikes.active ~ .bar {
        width: 6rem;
        left: 9rem;
      }

      &.theme__myfollower.active ~ .bar {
        width: 6rem;
        left: 17.5rem;
      }

      &.theme__myfollowing.active ~ .bar {
        width: 6rem;
        left: 26rem;
      }
    }
  }
`;

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
  @media screen and (max-width: 549px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const HeartIcon = styled(AiFillHeart)`
  color: var(--font-tag-color);
  width: 2rem;
  height: 2rem;
  @media screen and (max-width: 549px) {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const PostIcon = styled(AiFillPicture)`
  color: var(--font-tag-color);
  width: 2rem;
  height: 2rem;
  @media screen and (max-width: 549px) {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

function UserInfoTab({ userdata }) {
  const { pathname } = useLocation();

  return (
    <MainThemeBar>
      <ul className="theme__lists">
        <li
          className={
            pathname === '/mypage' ? 'theme__mypost active' : 'theme__mypost'
          }
        >
          <button>
            <Link to="/mypage">
              <PostIcon />
              <span>게시글</span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/mypage/mylikes'
              ? 'theme__mylikes active'
              : 'theme__mylikes'
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
              ? 'theme__myfollower active'
              : 'theme__myfollower'
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
              ? 'theme__myfollowing active'
              : 'theme__myfollowing'
          }
        >
          <button>
            <Link to="/mypage/myfollowing">
              <CircleIcon>{userdata.following}</CircleIcon>
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
