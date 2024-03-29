import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginModalActions } from '../../../redux/loginModalSlice';
import SignupModal from '../modal/SignupModal';
import HeaderDropDownItem from './HeaderDropDownItem';

const MenuContainer = styled.div`
  .menu__dropdown {
    position: absolute;
    top: 7.5rem;
    right: -1rem;
    background-color: var(--base-white-color);
    border-radius: 8px;
    padding: 1rem 0px;
    width: 13vw;
    z-index: 10;
    ul {
      > li:first-child {
        display: none;
      }
    }
  }

  .menu__dropdown ul li {
    padding: 1rem 0px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  .menu__dropdown ul li {
    &:hover {
      a,
      button {
        color: var(--button-theme-hv);
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
  .menu__dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: 500ms ease;
  }

  .menu__dropdown.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2rem);
    transition: 500ms ease;
  }

  @media screen and (max-width: 549px) {
    .menu__dropdown {
      width: 15rem;
      ul {
        > li:first-child {
          text-align: center;
          display: block;
        }
      }
    }
  }
`;

function HeaderDropDownBox({ active, activeHandler, closeFocus }) {
  const isLogin = useSelector(state => state.login.isLogin);
  const dispatch = useDispatch();
  const accountId = localStorage.getItem('accountId');
  const signUpModal = useSelector(state => state.loginModal.signupModalOpened);
  const loginModalOpen = () => {
    dispatch(loginModalActions.openLoginModal());
  };

  const signUpOpenHandler = () => {
    dispatch(loginModalActions.openSignupModal());
  };

  const signUpCloseHandler = () => {
    dispatch(loginModalActions.closeSignupModal());
  };

  const closeModal = e => {
    if (
      closeFocus &&
      (!closeFocus.current || !closeFocus.current.contains(e.target))
    ) {
      activeHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeModal);

    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, []);

  return (
    <MenuContainer>
      {signUpModal && <SignupModal onSignupModalCloser={signUpCloseHandler} />}
      <div className={`menu__dropdown ${active ? 'active' : 'inactive'}`}>
        <ul>
          {isLogin ? (
            <>
              <HeaderDropDownItem
                linkText="스토리 공유"
                link="/publish"
                activeHandler={activeHandler}
              />
              <HeaderDropDownItem
                linkText="마이 페이지"
                link={`/mypage/mypost/${accountId}`}
                activeHandler={activeHandler}
                accountId={accountId}
              />
              <HeaderDropDownItem
                linkText="로그아웃"
                link="/"
                activeHandler={activeHandler}
              />
            </>
          ) : (
            <>
              <HeaderDropDownItem
                linkText="로그인"
                link="/"
                activeHandler={loginModalOpen}
              />
              <HeaderDropDownItem
                linkText="회원가입"
                link="/"
                activeHandler={signUpOpenHandler}
              />
            </>
          )}
        </ul>
      </div>
    </MenuContainer>
  );
}

export default HeaderDropDownBox;
