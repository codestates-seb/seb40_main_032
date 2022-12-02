import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginModalActions } from '../../../redux/loginModalSlice';
import tempPasswordApi from '../../../api/tempPasswordApi';
import Backdrop from './Backdrop';
import ModalCard from './ModalCard';
import { DefaultButton } from '../button/ButtonStyle';
import ConfirmModal from './ConfirmModal';

const FindPasswordModalStyle = styled.div`
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

  .content {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  .findpassword__form {
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
`;

function FindPasswordModal() {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState(true);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const findPasswordModalCloser = () => {
    dispatch(loginModalActions.closeFindPasswordModal());
  };

  const confirmModalCloser = () => {
    setConfirmModalOpened(false);
    dispatch(loginModalActions.closeFindPasswordModal());
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (email.trim().length === 0 || !email.includes('@')) {
      setValidation(false);
      return;
    }
    tempPasswordApi(email)
      .then(() => {
        setConfirmModalOpened(true);
      })
      .catch(err => {
        if (err.response.data.code === '013') {
          setErrorMessage(err.response.data.message);
          setValidation(false);
        } else {
          setErrorMessage('올바른 이메일을 입력해주세요.');
          setValidation(false);
        }
      });
  };
  return (
    <>
      <Backdrop onClick={findPasswordModalCloser}>
        <ModalCard
          onStopPropagation={e => {
            e.stopPropagation();
          }}
          onClick={findPasswordModalCloser}
        >
          <FindPasswordModalStyle>
            <div className="title">비밀번호찾기</div>
            <div className="content">
              입력하신 이메일로 임시비밀번호가 발송됩니다.
            </div>
            <form className="findpassword__form">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="회원가입에 사용하신 이메일을 입력하세요"
                onChange={onChangeEmail}
                value={email}
              />
              {!validation && (
                <div className="input__validation">{errorMessage}</div>
              )}
              <DefaultButton
                width="100%"
                height="4rem"
                fontSize="1.7rem"
                onClick={onSubmitHandler}
                type="submit"
                margin="1.5rem 0 0 0"
              >
                비밀번호찾기
              </DefaultButton>
            </form>
          </FindPasswordModalStyle>
        </ModalCard>
      </Backdrop>
      {confirmModalOpened && (
        <ConfirmModal
          modalMessage="입력하신 이메일을 확인해주세요."
          modalCloser={confirmModalCloser}
        />
      )}
    </>
  );
}

export default FindPasswordModal;
