import React from 'react';
import styled from 'styled-components';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton } from '../button/ButtonStyle';

const LoginModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;

  .title {
    display: flex;
    justify-content: center;
    color: var(--font-base-black);
    font-size: 1.7rem;
    font-weight: var(--font-bold);
  }
  .message {
    display: flex;
    justify-content: center;
    color: var(--font-base-black);
    font-size: 1.7rem;
    margin: 1.5rem;
    width: 25rem;
  }
`;

function LoginModal({ modalCloser }) {
  const onSubmitHandler = () => {
    modalCloser();
  };
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
            <label htmlFor="nickname">아이디</label>
            <input id="nickname" placeholder="이메일 주소를 입력하세요" />
            <label htmlFor="password">비밀번호</label>
            <input id="password" placeholder="비밀번호를 입력하세요" />
            <DefaultButton
              width="100%"
              height="4rem"
              fontSize="1.7rem"
              onClick={onSubmitHandler}
              type="submit"
            >
              확인
            </DefaultButton>
          </form>
        </LoginModalStyle>
      </ModalCard>
    </Backdrop>
  );
}

export default LoginModal;
