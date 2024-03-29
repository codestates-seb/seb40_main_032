import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginModalActions } from '../../../redux/loginModalSlice';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton, TransparentButton } from '../button/ButtonStyle';
import loginAsync from '../../../redux/action/loginAsync';
import loginUserApi from '../../../api/loginUserApi';

const LoginModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  width: 40rem;

  @media screen and (max-width: 549px) {
    width: 100%;
  }

  .title {
    display: flex;
    justify-content: center;
    color: var(--font-base-black);
    font-size: 1.7rem;
    font-weight: var(--font-bold);
    margin-bottom: 1rem;
  }

  .login__form {
    color: var(--font-base-black);
    display: flex;
    flex-direction: column;
    label {
      font-size: 1.7rem;
      margin-top: 1rem;
    }
    input {
      border: none;
      border-bottom: 1px solid var(--font-base-grey);
      padding: 0.5rem 0.5rem 0.5rem 0;
      margin: 1rem 0;
      @media screen and (max-width: 549px) {
        width: 100%;
      }
    }
    .input__validation {
      color: red;
      font-size: 1.2rem;
    }
  }

  .footer {
    color: var(--font-base-black);
    display: flex;
    margin: 1rem 0;
    font-size: 1.3rem;

    .footer__content {
      > div {
        margin: 0.5rem 0 0 0;
      }
    }
  }
`;

const LoginButton = styled(DefaultButton)`
  &:disabled {
    background: var(--button-font-color);
    color: var(--font-base-grey);
    cursor: not-allowed;
  }
`;

function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [validationCorrect, setValidationCorrect] = useState({
    emailCorrect: true,
    passwordCorrect: true,
  });
  const dispatch = useDispatch();

  const loginModalCloser = () => {
    dispatch(loginModalActions.closeLoginModal());
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const signupModalOpener = () => {
    dispatch(loginModalActions.openSignupModal());
    loginModalCloser();
  };

  const findPasswordModalOpener = () => {
    dispatch(loginModalActions.openFindPasswordModal());
    loginModalCloser();
  };

  async function login() {
    const data = { email, password };
    setIsLoading(true);
    try {
      await dispatch(loginAsync(data)).unwrap();
      setLoginError(false);
      await loginUserApi();
      setIsLoading(false);
      loginModalCloser();
      window.location.reload();
    } catch (err) {
      if (err.response.data.code === '002') {
        setLoginError(true);
      }
      setIsLoading(false);
    }
  }

  const oauthHandler = () => {
    window.location.replace(
      'http://ec2-43-201-25-87.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google',
    );
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (email.trim().length === 0 || !email.includes('@')) {
      setValidationCorrect(prev => {
        return { ...prev, emailCorrect: false, passwordCorrect: true };
      });
      setLoginError(false);
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, emailCorrect: true };
    });
    if (password.trim().length === 0) {
      setValidationCorrect(prev => {
        return { ...prev, passwordCorrect: false };
      });
      setLoginError(false);
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, passwordCorrect: true };
    });
    login();
  };

  return (
    <Backdrop onClick={loginModalCloser}>
      <ModalCard
        onStopPropagation={e => {
          e.stopPropagation();
        }}
        onClick={loginModalCloser}
      >
        <LoginModalStyle>
          <div className="title">로그인</div>
          <form className="login__form">
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="이메일 주소를 입력하세요"
              onChange={onChangeEmail}
              value={email}
            />
            {!validationCorrect.emailCorrect && (
              <div className="input__validation">
                아이디는 이메일 형식이여야 합니다.
              </div>
            )}
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={onChangePassword}
              value={password}
            />
            {!validationCorrect.passwordCorrect && (
              <div className="input__validation">비밀번호를 입력해주세요.</div>
            )}
            {loginError && (
              <div className="input__validation">
                아이디 혹은 비밀번호가 잘못되었습니다.
              </div>
            )}
            <LoginButton
              width="100%"
              height="4rem"
              fontSize="1.7rem"
              onClick={onSubmitHandler}
              type="submit"
              margin="1.5rem 0 0 0"
              disabled={isLoading}
            >
              {isLoading ? '로그인중' : '로그인'}
            </LoginButton>
          </form>
          <footer className="footer">
            <div className="footer__content">
              <div>
                구글 계정으로 로그인
                <TransparentButton
                  fontSize="1.3rem"
                  onClick={oauthHandler}
                  margin="0 0 0 0.5rem"
                >
                  바로가기 &gt;
                </TransparentButton>
              </div>
              <div>
                아직 회원이 아니신가요?
                <TransparentButton
                  fontSize="1.3rem"
                  onClick={signupModalOpener}
                  margin="0 0 0 0.5rem"
                >
                  회원가입 &gt;
                </TransparentButton>
              </div>
              <div>
                비밀번호를 잊으셨나요?
                <TransparentButton
                  fontSize="1.3rem"
                  onClick={findPasswordModalOpener}
                  margin="0 0 0 0.5rem"
                >
                  비밀번호찾기 &gt;
                </TransparentButton>
              </div>
            </div>
          </footer>
        </LoginModalStyle>
      </ModalCard>
    </Backdrop>
  );
}

export default LoginModal;
