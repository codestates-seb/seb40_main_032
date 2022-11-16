import React, { useState } from 'react';
import styled from 'styled-components';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton, TransparentButton } from '../button/ButtonStyle';

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
  const [validationCorrect, setValidationCorrect] = useState({
    emailCorrect: true,
    passwordCorrect: true,
  });

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  // 추후 로그인 axios를 onSubmitHandler 함수에 작성할 것.
  const onSubmitHandler = e => {
    e.preventDefault();
    // 유효성 검사
    if (email.trim().length === 0 || !email.includes('@')) {
      setValidationCorrect(prev => {
        return { ...prev, emailCorrect: false };
      });
      return;
    }
    if (password.length < 8) {
      setValidationCorrect(prev => {
        return { ...prev, passwordCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, emailCorrect: true, passwordCorrect: true };
    });
    modalCloser();
  };
  console.log(validationCorrect.emailCorrect);
  return (
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
              <div className="input__validation">
                비밀번호는 8자 이상으로 입력해주세요.
              </div>
            )}
            <DefaultButton
              width="100%"
              height="4rem"
              fontSize="1.7rem"
              onClick={onSubmitHandler}
              type="submit"
              margin="1.5rem 0"
            >
              확인
            </DefaultButton>
          </form>
          <footer className="footer">
            <div className="footer__content">아직 회원이 아니신가요?</div>
            <TransparentButton fontSize="1.4rem">
              회원가입 &gt;
            </TransparentButton>
          </footer>
        </LoginModalStyle>
      </ModalCard>
    </Backdrop>
  );
}

export default LoginModal;
