import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const ModalBaseCard = styled.div`
  background: var(--base-white-color);
  border-radius: var(--radius-15);
  z-index: 100;
  position: fixed;
  top: 25%;
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 3rem;
  right: 3rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

function ModalCard({ children, onStopPropagation, onClick }) {
  return (
    <ModalBaseCard onClick={onStopPropagation}>
      <CloseIcon onClick={onClick} />
      {children}
    </ModalBaseCard>
  );
}

export default ModalCard;
