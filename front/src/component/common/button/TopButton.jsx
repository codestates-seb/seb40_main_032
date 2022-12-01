import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillUpCircle } from 'react-icons/ai';

const TopButtonStyle = styled(AiFillUpCircle)`
  position: fixed;
  bottom: 5.5rem;
  right: 1rem;
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  color: var(--button-theme);
  background-color: white;
  border-radius: 50%;
  border: 2px solid var(--button-theme);
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.3);
`;

function TopButton() {
  const [topButton, setTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setTopButton(true);
      } else {
        setTopButton(false);
      }
    });
  }, []);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return <div>{topButton && <TopButtonStyle onClick={scrollup} />}</div>;
}

export default TopButton;
