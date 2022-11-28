import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../../redux/loginSlice';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookieRemover = () => {
    removeCookie('profile', {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
    removeCookie('accountId', {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
    removeCookie('accessToken', {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
  };
  // 로그아웃 핸들러
  const logoutHandler = () => {
    cookieRemover();
    dispatch(loginActions.logout());
    navigate('/');
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
