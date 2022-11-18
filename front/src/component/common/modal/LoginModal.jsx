import React, { useState } from 'react';
import styled from 'styled-components';
import loginApi from '../../../api/loginApi';
import { setCookie } from '../../../util/cookie';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton, TransparentButton } from '../button/ButtonStyle';
import SignupModal from './SignupModal';

const LoginModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  width: 40rem;

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
      @media screen and (max-width: 550px) {
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
      margin-right: 0.5rem;
    }
  }
`;

function LoginModal({ modalCloser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupModalOpened, setSignupModalOpened] = useState(false);

  // 인풋값 상태 저장 함수
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  // 회원가입 버튼 클릭 시 회원가입 모달을 띄우기 위한 상태 변경 함수
  const signupModalOpener = () => {
    setSignupModalOpened(true);
  };
  const signupModalCloser = () => {
    setSignupModalOpened(false);
  };

  // 로그인 요청
  async function login() {
    try {
      const res = await loginApi({ email, password });
      console.log(res);
      console.log(res.headers.authorization);
      // 쿠키의 domain 옵션은 로컬호스트나 ip주소같은 url에선 작동하지 않음.
      // chrome 정책에 의해 .com과 같은 일반적인 도메인 주소에서만 사용 가능.
      // httpOnly 옵션을 설정할 경우 클라이언트측에서 쿠키를 저장, 사용할 수 없음.
      // sameSite 옵션은 서버와 클라이언트의 주소가 다르므로 None으로 설정했음.
      setCookie('accessToken', res.headers.authorization, {
        path: '/',
        sameSite: 'None',
        secure: 'false',
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 로그인 유효성 검사는 백엔드에서 받는 응답에 따라 나타나게 할 것.
  const onSubmitHandler = e => {
    e.preventDefault();
    login();
    modalCloser();
  };

  return (
    <>
      <Backdrop onClick={modalCloser}>
        <ModalCard
          onStopPropagation={e => {
            e.stopPropagation();
          }}
          onClick={modalCloser}
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
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={onChangePassword}
                value={password}
              />
              <DefaultButton
                width="100%"
                height="4rem"
                fontSize="1.7rem"
                onClick={onSubmitHandler}
                type="submit"
                margin="1.5rem 0"
              >
                로그인
              </DefaultButton>
            </form>
            <footer className="footer">
              <div className="footer__content">아직 회원이 아니신가요?</div>
              <TransparentButton fontSize="1.4rem" onClick={signupModalOpener}>
                회원가입 &gt;
              </TransparentButton>
            </footer>
          </LoginModalStyle>
        </ModalCard>
      </Backdrop>
      {signupModalOpened && (
        <SignupModal onSignupModalCloser={signupModalCloser} />
      )}
    </>
  );
}

export default LoginModal;
