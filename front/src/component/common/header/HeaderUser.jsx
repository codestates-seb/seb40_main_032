import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { DefaultButton } from '../button/ButtonStyle';
import HeaderDropDownBox from './HeaderDropDownBox';
import { getCookie } from '../../../util/cookie';
import { loginModalActions } from '../../../redux/loginModalSlice';

const HeaderUserWrapper = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  .header__write {
    flex: 1;
    margin-right: 1.5rem;
    background: #fff;
    color: var(--main-font-color);
    &:hover {
      background: #f5f5f5;
      color: var(--main-font-color);
    }
  }
  .header__box {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .profile__image {
      width: 3.5rem;
      height: 3.5rem;
      overflow: hidden;
      border-radius: var(--radius-50);
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > :last-child {
      transition: transform 300ms;
      transform: rotate(360deg);
    }
  }
  .header__burger {
    display: none;
  }

  @media screen and (max-width: 549px) {
    display: flex;
    justify-content: right;
    min-width: 0px;
    cursor: pointer;
    .header__write {
      display: none;
    }
    .header__box {
      display: none;
    }
    .header__burger {
      display: block;
      fill: var(--font-base-grey);
    }
  }
`;
// { loginModalOpener }
function HeaderUser() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const isLogin = useSelector(state => state.login.isLogin);
  const dispatch = useDispatch();
  const target = useRef(null);
  const dropdownTarget = useRef(null);
  const loginModalOpen = () => {
    dispatch(loginModalActions.openLoginModal());
  };

  // 프로필 이미지 가져오기
  const profile = getCookie('profile');
  useEffect(() => {
    if (profile) {
      setProfileImg(profile);
    }
  }, [profileImg]);

  const activeHandler = () => {
    setActive(false);
  };

  useEffect(() => {
    const io = new IntersectionObserver(() => {
      setActive(false);
    });
    if (target.current) {
      io.observe(target.current);
    }
    return () => io.disconnect();
  }, []);

  return (
    <HeaderUserWrapper ref={dropdownTarget}>
      <DefaultButton
        onClick={() => {
          navigate('/publish');
        }}
        className="header__write"
        fontSize="1.6rem"
        width="9.5rem"
        height="4.3rem"
        fontWeight="500"
      >
        게시물 작성
      </DefaultButton>
      <div className="header__box">
        {!isLogin ? (
          <>
            <DefaultButton
              onClick={loginModalOpen}
              fontSize="1.6rem"
              width="7.5rem"
              height="4.3rem"
              fontWeight="500"
            >
              로그인
            </DefaultButton>

            <div className="header__burger" ref={target}>
              <GiHamburgerMenu
                onClick={() => setActive(prev => !prev)}
                size="2.5rem"
              />
            </div>
          </>
        ) : (
          <>
            {profileImg ? (
              <div
                role="button"
                tabIndex={0}
                className="profile__image"
                onClick={() => setActive(prev => !prev)}
                onKeyDown={e => {
                  if (e.code === 'Enter') {
                    setActive(prev => !prev);
                  }
                }}
              >
                <img
                  // className="profile__image"
                  src={profileImg}
                  alt="프로필 이미지"
                />
              </div>
            ) : (
              <BiUserCircle size="4.3rem" />
            )}
            {active ? (
              <MdOutlineArrowDropDown
                onClick={() => setActive(prev => !prev)}
                size="2.5rem"
                color="hsl(146, 50%, 50%)"
              />
            ) : (
              <MdOutlineArrowDropUp
                size="2.5rem"
                color="hsl(146, 50%, 50%)"
                onClick={() => setActive(prev => !prev)}
              />
            )}
          </>
        )}
      </div>
      <div className="header__burger" ref={target}>
        <GiHamburgerMenu
          onClick={() => setActive(prev => !prev)}
          size="2.5rem"
        />
      </div>
      <HeaderDropDownBox
        active={active}
        activeHandler={activeHandler}
        closeFocus={dropdownTarget}
      />
    </HeaderUserWrapper>
  );
}

export default HeaderUser;
