import { RotatingLines } from 'react-loader-spinner';

function LoadingSpinner({ width }) {
  return (
    <RotatingLines
      strokeColor="var(--holder-base-color)"
      width={width || '60'}
    />
  );
}

export default LoadingSpinner;
