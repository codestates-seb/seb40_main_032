import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton } from '../button/ButtonStyle';
import ConfirmModal from './ConfirmModal';
import defaultUserImg from '../../../assets/defaultUserImg.jpeg';

const SignupModalStyle = styled.div`
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
`;

function SignupModal({ onSignupModalCloser }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successSignup, setSuccessSignup] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [validationCorrect, setValidationCorrect] = useState({
    emailCorrect: true,
    passwordCorrect: true,
    nicknameCorrect: true,
  });

  // 인풋값 상태 저장 함수
  const onChangeNickname = e => {
    setNickname(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  // 회원가입 axios 요청
  async function postSingup() {
    const formData = new FormData();
    const blob = new Blob([defaultUserImg], { type: 'image/jpeg' });
    formData.append('profile', blob, 'profile.jpeg');
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    try {
      const res = await axios('/accounts', {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
        data: formData,
      });
      setSignupError('');
      setSuccessSignup(true);
      console.log(res);
    } catch (error) {
      console.log(error);
      // 백엔드에서 받은 중복이메일 유효성 검사 표시
      if (error.response.data.exception === 'BusinessLogicException') {
        setSignupError(error.response.data.message);
      }
    }
  }
  console.log(successSignup);

  // 회원가입 submit버튼 핸들러
  const onSubmitHandler = e => {
    e.preventDefault();
    // 유효성 검사
    // 닉네임 유효성 검사
    if (nickname.trim().length === 0) {
      setValidationCorrect(prev => {
        return { ...prev, nicknameCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, nicknameCorrect: true };
    });
    // 이메일 유효성 검사
    if (email.trim().length === 0 || !email.includes('@')) {
      setValidationCorrect(prev => {
        return { ...prev, emailCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, emailCorrect: true };
    });
    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setValidationCorrect(prev => {
        return { ...prev, passwordCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, passwordCorrect: true };
    });
    postSingup();
    // UX를 위해 여기서 회원가입 모달을 닫지 않고, 회원가입이 성공적으로 완료되었을 때 모달이 닫힌다.
    // onSignupModalCloser();
  };

  // 컨펌 모달 닫기 함수
  // UX를 위해 회원가입 모달도 같이 닫힌다.
  const onConfirmModalCloser = () => {
    setSuccessSignup(false);
    onSignupModalCloser();
  };

  return (
    <>
      <Backdrop onClick={onSignupModalCloser}>
        <ModalCard
          onStopPropagation={e => {
            e.stopPropagation();
          }}
          onClick={onSignupModalCloser}
        >
          <SignupModalStyle>
            <div className="title">회원가입</div>
            <form className="login__form">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                onChange={onChangeNickname}
                value={nickname}
              />
              {!validationCorrect.nicknameCorrect && (
                <div className="input__validation">
                  닉네임은 반드시 입력해야 합니다.
                </div>
              )}
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
              {signupError && (
                <div className="input__validation">{signupError}</div>
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
                회원가입
              </DefaultButton>
            </form>
          </SignupModalStyle>
        </ModalCard>
      </Backdrop>
      {successSignup && (
        <ConfirmModal
          modalMessage="회원가입이 완료되었습니다."
          modalCloser={onConfirmModalCloser}
        />
      )}
    </>
  );
}

export default SignupModal;
