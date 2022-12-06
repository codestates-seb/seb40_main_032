import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

const LoadingImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

function Loading() {
  return (
    <LoadingImg>
      <LoadingSpinner width={100} />
    </LoadingImg>
  );
}

export default Loading;
