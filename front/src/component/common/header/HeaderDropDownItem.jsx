import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { removeCookie } from '../../../util/cookie';

const ItemWrapper = styled.li`
  display: flex;
  margin: 1rem auto;
  justify-content: center;
  a {
    max-width: 10rem;
    transition: 500ms;
    font-size: 1.3rem;
    font-weight: var(--font-medium);
    color: var(--font-base-black);
  }
  button {
    max-width: 10rem;
    transition: 500ms;
    font-size: 1.3rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--font-base-black);
  }
`;

function HedaerDropDownItem({ linkText, link, activeHandler }) {
  // 로그아웃 핸들러
  const logoutHandler = () => {
    console.log('로그아웃 핸들러 앞');
    removeCookie('profile');
    removeCookie('accountId');
    removeCookie('accessToken');
    console.log('로그아웃 핸들러 중간');
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
    console.log('로그아웃 핸들러 끝');
  };

  return (
    <ItemWrapper>
      {link === '/' ? (
        <button
          onClick={() => {
            activeHandler();
            if (linkText === '로그아웃') logoutHandler();
          }}
        >
          {linkText}
        </button>
      ) : (
        <Link to={link} onClick={activeHandler}>
          {linkText}
        </Link>
      )}
    </ItemWrapper>
  );
}

export default HedaerDropDownItem;
