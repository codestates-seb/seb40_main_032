import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DefaultButton, TransparentButton } from '../common/button/ButtonStyle';
import ConfirmModal from '../common/modal/ConfirmModal';
import YesNoModal from '../common/modal/YesNoModal';
import publishApi from '../../api/publishApi';
import postEditApi from '../../api/postEditApi';
import { loginModalActions } from '../../redux/loginModalSlice';

function PublishModalButton({ boardId, mandatory, formData, isPublishPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.isLogin);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [yesNoModalOpened, setYesNoModalOpened] = useState(false);

  // 모달 닫는 함수
  const confirmModalCloser = () => {
    setConfirmModalOpened(false);
  };

  const yesNoModalOpener = event => {
    event.preventDefault();
    setYesNoModalOpened(true);
  };

  const yesNoModalActioner = () => {
    navigate(-1);
  };

  const yesNoModalCloser = () => {
    setYesNoModalOpened(false);
  };

  const loginModalOpener = () => {
    dispatch(loginModalActions.openLoginModal());
  };

  // 게시글 등록 요청
  const publishRequest = async event => {
    event.preventDefault();
    if (mandatory)
      await publishApi(formData)
        .then(res => {
          if (res.status === 201) {
            console.log(res);
            console.log(res.data.id);
            setConfirmModalOpened(true);
            setTimeout(() => {
              navigate(`/postDetail/${res.data.id}`);
            }, 2000);
          }
        })
        .catch(error => console.log(error.response.data.message));
    else console.log('not valid'); // 임시
  };

  // 게시글 수정 요청
  const editRequest = async event => {
    event.preventDefault();
    if (mandatory)
      await postEditApi(boardId, formData)
        .then(res => {
          if (res.status === 200) {
            setConfirmModalOpened(true);
            setTimeout(() => {
              navigate(`/postDetail/${res.data.id}`);
            }, 1000);
          }
        })
        .catch(error => console.log(error.response.data.message));
  };

  // (비로그인) url입력 접근시 로그인창으로 redirect
  useEffect(() => {
    if (!login) {
      alert('로그인 해주세요');
      navigate('/');
      loginModalOpener();
    }
    return () => {};
  }, []);

  return (
    <>
      <ButtonContainer>
        <PublishButton
          width="8vw"
          height="4vh"
          fontSize="var(--font-15)"
          fontWeight="var(--font-bold)"
          onClick={isPublishPage ? publishRequest : editRequest}
        >
          <span>{isPublishPage ? '등록' : '수정'}</span>
        </PublishButton>
        <CancelButton
          width="8vw"
          fontSize="var(—font-15)"
          fontWeight="var(—font-bold)"
          onClick={yesNoModalOpener}
        >
          <span>취소</span>
        </CancelButton>
      </ButtonContainer>
      {confirmModalOpened ? (
        <ConfirmModal
          modalMessage={
            isPublishPage
              ? '게시글 등록이 완료되었습니다.'
              : '게시글 수정이 완료되었습니다.'
          }
          modalCloser={confirmModalCloser}
        />
      ) : null}
      {yesNoModalOpened ? (
        <YesNoModal
          modalMessage={
            isPublishPage
              ? '게시글 작성을 취소할까요?'
              : '게시글 수정을 취소할까요?'
          }
          modalActioner={yesNoModalActioner}
          modalCloser={yesNoModalCloser}
        />
      ) : null}
    </>
  );
}

export default PublishModalButton;

// 버튼 - 등록, 취소
const ButtonContainer = styled.form`
  display: flex;
  justify-content: start;
`;

// 등록 버튼 스타일링
const PublishButton = styled(DefaultButton)`
  @media screen and (max-width: 549px) {
    width: 25vw;
    height: 4vh;
  }
  &:hover {
    background: var(—-button-theme-hv);
    color: var(—-base-white-color);
    transition: 0.1s ease-in-out;
  }
`;

// 취소 버튼 스타일링
const CancelButton = styled(TransparentButton)`
  &:hover {
    color: red;
    transition: 0.1s ease-in-out;
  }
  @media screen and (max-width: 549px) {
    width: 28vw;
    height: 4vh;
  }
`;
