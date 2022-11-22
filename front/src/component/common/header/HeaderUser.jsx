import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { DefaultButton } from '../button/ButtonStyle';
import HeaderDropDownBox from './HeaderDropDownBox';

const HeaderUserWrapper = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 20rem;
  position: relative;
  .header__write {
    flex: 1;
    margin-right: 1.5rem;
    background: #fff;
    color: var(--main-font-color);
    &:hover {
      background: var(--button-font-color);
    }
  }
  .header__box {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .profile__image {
      width: 3.5rem;
      border-radius: var(--radius-50);
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

function HeaderUser({ loginModalOpener }) {
  const [active, setActive] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const isLogin = useSelector(state => state.login.isLogin);

  // 프로필 이미지 가져오기
  useEffect(() => {
    if (localStorage.getItem('profile')) {
      setProfileImg(localStorage.getItem('profile'));
    }
  }, [profileImg]);

  const activeHandler = () => {
    setActive(false);
  };

  return (
    <HeaderUserWrapper>
      <DefaultButton
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
          <DefaultButton
            onClick={loginModalOpener}
            fontSize="1.6rem"
            width="7.5rem"
            height="4.3rem"
            fontWeight="500"
          >
            로그인
          </DefaultButton>
        ) : (
          <>
            {profileImg ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActive(prev => !prev)}
                onKeyDown={e => {
                  if (e.code === 'Enter') {
                    setActive(prev => !prev);
                  }
                }}
              >
                <img
                  className="profile__image"
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
      <GiHamburgerMenu
        onClick={() => setActive(prev => !prev)}
        className="header__burger"
        size="2.5rem"
      />
      <HeaderDropDownBox active={active} activeHandler={activeHandler} />
    </HeaderUserWrapper>
  );
}

export default HeaderUser;
