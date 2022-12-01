import styled from 'styled-components';

const EmptyTextBox = styled.div`
  display: flex;
  font-size: 3rem;
  color: var(--holder-base-color);
  > span {
    position: relative;
    display: block;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 1px solid var(--holder-base-color);
    margin-right: 1rem;
    > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

function EmptyText({ icon, text }) {
  return (
    <EmptyTextBox>
      <span>{icon}</span>
      <p>{text}</p>
    </EmptyTextBox>
  );
}

export default EmptyText;
