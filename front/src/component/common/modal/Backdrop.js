import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background: rgba(0, 0, 0, 0.242);
  display: flex;
  justify-content: center;
`;

export default Backdrop;
