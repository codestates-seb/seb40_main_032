import React from 'react';
import styled from 'styled-components';
import { AiFillQuestionCircle } from 'react-icons/ai';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton, NegativeButton } from '../button/ButtonStyle';

const YesNoModalStyle = styled.div`
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

  .button__wrapper {
    display: flex;
    justify-content: space-between;
  }
`;

const QuestionIcon = styled(AiFillQuestionCircle)`
  color: var(--button-theme);
  font-size: 5rem;
`;

function YesNoModal({ modalMessage, modalCloser }) {
  return (
    <Backdrop onClick={modalCloser}>
      <ModalCard
        onStopPropagation={e => {
          e.stopPropagation();
        }}
        onClick={modalCloser}
      >
        <YesNoModalStyle>
          <div className="icon__wrapper">
            <QuestionIcon />
          </div>
          <div className="message">{modalMessage}</div>
          <div className="button__wrapper">
            <DefaultButton
              width="45%"
              height="4rem"
              fontSize="1.7rem"
              onClick={modalCloser}
            >
              예
            </DefaultButton>
            <NegativeButton
              width="45%"
              height="4rem"
              fontSize="1.7rem"
              onClick={modalCloser}
            >
              아니오
            </NegativeButton>
          </div>
        </YesNoModalStyle>
      </ModalCard>
    </Backdrop>
  );
}

export default YesNoModal;
