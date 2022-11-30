import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TransparentButton } from '../common/button/ButtonStyle';
import deleteUserApi from '../../api/deleteUserApi';
import YesNoModal from '../common/modal/YesNoModal';
import ConfirmModal from '../common/modal/ConfirmModal';

const DeleteButton = styled(TransparentButton)`
  color: var(--holder-base-color);
  flex: 1;
  text-align: left;
  @media screen and (max-width: 549px) {
    margin-left: 2rem;
  }
`;

const ReconfirmYesNoModal = styled(YesNoModal)``;
const ReReconfirmYesNoModal = styled(YesNoModal)``;
const FarewellModal = styled(ConfirmModal)``;

function MyinfoEditDelete() {
  const navigate = useNavigate();
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [reconfirmModalOpened, setReconfirmModalOpened] = useState(false);
  const [reReconfirmModalOpened, setReReconfirmModalOpened] = useState(false);
  const [farewellModalOpened, setFarewellModalOpened] = useState(false);

  const openConfirmModal = () => {
    setConfirmModalOpened(true);
  };

  const openReconfirmModal = () => {
    setConfirmModalOpened(false);
    setReconfirmModalOpened(true);
  };

  const openReReconfirmModal = () => {
    setReconfirmModalOpened(false);
    setReReconfirmModalOpened(true);
  };

  const openFarewellModal = () => {
    setReReconfirmModalOpened(false);
    setFarewellModalOpened(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpened(false);
    setReconfirmModalOpened(false);
    setReReconfirmModalOpened(false);
  };

  const deleteRequest = event => {
    event.preventDefault();

    deleteUserApi()
      .then(res => {
        if (res.status === 200) {
          openFarewellModal();
          setTimeout(() => {
            toast('회원 탈퇴가 완료되었습니다.', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            navigate('/');
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <DeleteButton onClick={openConfirmModal}>
        <small>회원탈퇴 &gt;</small>
      </DeleteButton>
      {confirmModalOpened ? (
        <YesNoModal
          modalMessage="회원 탈퇴를 진행하시겠습니까?"
          modalActioner={openReconfirmModal}
          modalCloser={closeConfirmModal}
        />
      ) : null}
      {reconfirmModalOpened ? (
        <ReconfirmYesNoModal
          modalMessage="개인정보 보호를 위해 아이디 및 데이터는 완전히 삭제되어 복구할 수 없습니다. 진행하시겠습니까?"
          modalActioner={openReReconfirmModal}
          modalCloser={closeConfirmModal}
        />
      ) : null}
      {reReconfirmModalOpened ? (
        <ReReconfirmYesNoModal
          modalMessage="안내 사항을 모두 확인하였으며, 이에 동의합니다."
          modalActioner={deleteRequest}
          modalCloser={closeConfirmModal}
        />
      ) : null}
      {farewellModalOpened ? (
        <FarewellModal
          modalMessage="이용해주셔서 감사합니다."
          modalCloser={closeConfirmModal}
        />
      ) : null}
    </>
  );
}

export default MyinfoEditDelete;
