import React from 'react';
import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton } from '../button/ButtonStyle';

const ConfirmModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;

  .icon__wrapper {
    display: flex;
    justify-content: center;
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

const CheckIcon = styled(AiFillCheckCircle)`
  color: var(--button-theme);
  font-size: 5rem;
`;

function ConfirmModal({ modalMessage, modalCloser }) {
  return (
    <Backdrop onClick={modalCloser}>
      <ModalCard
        onStopPropagation={e => {
          e.stopPropagation();
        }}
        onClick={modalCloser}
      >
        <ConfirmModalStyle>
          <div className="icon__wrapper">
            <CheckIcon />
          </div>
          <div className="message">{modalMessage}</div>
          <DefaultButton
            width="100%"
            height="4rem"
            fontSize="1.7rem"
            onClick={modalCloser}
          >
            확인
          </DefaultButton>
        </ConfirmModalStyle>
      </ModalCard>
    </Backdrop>
  );
}

export default ConfirmModal;
