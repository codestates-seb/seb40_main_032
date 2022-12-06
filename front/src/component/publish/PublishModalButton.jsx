import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultButton, TransparentButton } from '../common/button/ButtonStyle';
import ConfirmModal from '../common/modal/ConfirmModal';
import YesNoModal from '../common/modal/YesNoModal';
import publishApi from '../../api/publishApi';
import postEditApi from '../../api/postEditApi';
import { loginModalActions } from '../../redux/loginModalSlice';
import LoadingSpinner from '../common/LoadingSpinner';

function PublishModalButton({ boardId, mandatory, formData, isPublishPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.isLogin);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [yesNoModalOpened, setYesNoModalOpened] = useState(false);
  const [resBoardId, setResBoardId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const confirmModalCloser = () => {
    setConfirmModalOpened(false);
    navigate(`/postDetail/${resBoardId}`);
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

  const photoAlert = () => {
    toast('사진을 1장 이상 업로드 하세요.', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const categoryAlert = () => {
    toast('테마를 선택하세요.', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const mandatoryAlert = () => {
    toast('필수 정보를 입력하세요.', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const networkAlert = () => {
    toast('네트워크 오류가 발생했습니다.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const showAlert = () => {
    if (formData.images.length === 0) {
      photoAlert();
    } else if (formData.category === '') {
      categoryAlert();
    } else mandatoryAlert();
  };

  const publishRequest = event => {
    event.preventDefault();
    if (!mandatory) showAlert();
    if (!isLoading && mandatory) {
      setIsLoading(true);
      publishApi(formData)
        .then(res => {
          if (res.status === 201) {
            setResBoardId(res.data.id);
            setConfirmModalOpened(true);
          }
          setIsLoading(false);
        })
        .catch(error => {
          networkAlert();
          console.log(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  const editRequest = async event => {
    event.preventDefault();
    if (!isLoading && mandatory) {
      setIsLoading(true);
      await postEditApi(boardId, formData)
        .then(res => {
          if (res.status === 200) {
            setResBoardId(res.data.id);
            setConfirmModalOpened(true);
            setIsLoading(false);
          }
        })
        .catch(error => {
          networkAlert();
          console.log(error.response.data.message);
          setIsLoading(false);
        });
    } else showAlert();
  };

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
          width="10rem"
          height="3.5rem"
          fontSize="var(--font-15)"
          fontWeight="var(--font-bold)"
          onClick={isPublishPage ? publishRequest : editRequest}
        >
          {isLoading ? (
            <LoadingSpinner width={25} />
          ) : (
            <span>{isPublishPage ? '등록' : '수정'}</span>
          )}
        </PublishButton>
        <CancelButton
          width="10rem"
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
              ? '스토리 등록이 완료되었습니다.'
              : '스토리 수정이 완료되었습니다.'
          }
          modalCloser={confirmModalCloser}
        />
      ) : null}
      {yesNoModalOpened ? (
        <YesNoModal
          modalMessage={
            isPublishPage
              ? '스토리 등록을 취소할까요?'
              : '스토리 수정을 취소할까요?'
          }
          modalActioner={yesNoModalActioner}
          modalCloser={yesNoModalCloser}
        />
      ) : null}
    </>
  );
}

export default PublishModalButton;

const ButtonContainer = styled.form`
  display: flex;
  justify-content: end;
`;

const PublishButton = styled(DefaultButton)`
  @media screen and (max-width: 549px) {
    width: 6rem;
    height: 3rem;
  }
  &:hover {
    background: var(—-button-theme-hv);
    color: var(—-base-white-color);
    transition: 0.1s ease-in-out;
  }
`;

const CancelButton = styled(TransparentButton)`
  &:hover {
    color: red;
    transition: 0.1s ease-in-out;
  }
  @media screen and (max-width: 549px) {
    width: 6rem;
    height: 3rem;
  }
`;
