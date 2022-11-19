import styled from 'styled-components';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowDownSFill } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { DefaultButton } from '../button/ButtonStyle';
import { removeCookie } from '../../../util/cookie';

const HeaderUserWrapper = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 20rem;
  .header__write {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    color: var(--font-base-black);
    background-color: transparent;
    border: 1px solid transparent;
    font-size: 2rem;
    cursor: pointer;
    flex: 1;
  }
  .header__box {
    display: flex;
    align-items: center;
    cursor: pointer;
    > :last-child {
      transition: transform 300ms;
      transform: rotate(360deg);
    }
  }
  .header__box--rorate {
    > :last-child {
      transition: transform 300ms;
      transform: rotate(180deg);
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
    }
  }
`;

function HeaderUser({ loginModalOpener }) {
  const [rorate, setRorate] = useState('');
  const isLogin = useSelector(state => state.login.isLogin);

  // 로그아웃 핸들러
  const logoutHandler = () => {
    removeCookie('accessToken');
    localStorage.removeItem('id');
    localStorage.removeItem('profile');
    window.location.href = '/';
  };

  return (
    <HeaderUserWrapper>
      <button className="header__write">게시물 작성</button>
      <div
        className={`header__box ${isLogin ? `header__box${rorate}` : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => setRorate(prev => (prev !== '' ? '' : '--rorate'))}
        onKeyDown={() => setRorate(prev => (prev !== '' ? '' : '--rorate'))}
      >
        {!isLogin ? (
          <DefaultButton
            onClick={loginModalOpener}
            fontSize="2rem"
            width="10rem"
            height="5rem"
            fontWeight="700"
          >
            로그인
          </DefaultButton>
        ) : (
          <>
            {/* 임시 로그아웃 버튼 */}
            <button onClick={logoutHandler}>로그아웃</button>
            <BiUserCircle size="4.3rem" />
            <RiArrowDownSFill size="2.5rem" color="hsl(146, 50%, 50%)" />
          </>
        )}
      </div>
      <GiHamburgerMenu className="header__burger" size="3.4rem" />
    </HeaderUserWrapper>
  );
}

export default HeaderUser;
