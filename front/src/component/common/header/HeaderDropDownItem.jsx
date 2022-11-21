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
    removeCookie('accessToken');
    localStorage.removeItem('id');
    localStorage.removeItem('profile');
    window.location.href = '/';
  };

  return (
    <ItemWrapper>
      {link === '/' ? (
        <button
          onClick={() => {
            activeHandler();
            logoutHandler();
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
