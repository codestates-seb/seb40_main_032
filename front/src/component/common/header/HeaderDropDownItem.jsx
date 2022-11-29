import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import { loginActions } from '../../../redux/loginSlice';
import { removeCookie } from '../../../util/cookie';
import GaEvent from '../../../util/eventGaTracking';

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

function HeaderDropDownItem({ linkText, link, activeHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookieRemover = () => {
    const option = {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    };
    removeCookie('profile', option);
    removeCookie('accountId', option);
    removeCookie('accessToken', option);
  };
  // 로그아웃 핸들러
  const logoutHandler = () => {
    cookieRemover();
    dispatch(loginActions.logout());
    navigate('/');
    ReactGA.event({
      category: GaEvent.Category.auth,
      action: GaEvent.Action.auth.logout,
    });
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

export default HeaderDropDownItem;
