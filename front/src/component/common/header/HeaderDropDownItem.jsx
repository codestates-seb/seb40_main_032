import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../../redux/loginSlice';

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

function HeaderDropDownItem({ linkText, link, activeHandler, accountId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookieRemover = () => {
    const option = {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    };
    localStorage.removeItem('profile', option);
    localStorage.removeItem('accountId', option);
    localStorage.removeItem('accessToken', option);
  };
  const logoutHandler = () => {
    cookieRemover();
    dispatch(loginActions.logout());
    navigate('/');
  };

  const myPageHandler = () => {
    activeHandler();
    window.location.href = `/mypage/mypost/${accountId}`;
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
      ) : linkText === '마이 페이지' ? (
        <button onClick={myPageHandler}>{linkText}</button>
      ) : (
        <Link to={link} onClick={activeHandler}>
          {linkText}
        </Link>
      )}
    </ItemWrapper>
  );
}

export default HeaderDropDownItem;
