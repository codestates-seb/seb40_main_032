import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

const FooterContainer = styled.div`
  width: 100%;
  max-width: 172rem;
  height: 5rem;
  margin: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    .footer__logo {
      font-family: 'Lobster', cursive;
      color: var(--button-theme);
      font-size: 1.8rem;
    }
    .copyright {
      font-size: 1.4rem;
      color: var(--font-base-grey);
      padding: 4px 0 0 1rem;
    }
  }
  .github {
    > a {
      color: var(--font-base-black);
    }
    > a > svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

function CommonFooter() {
  return (
    <FooterContainer className="footer__container">
      <div>
        <p className="footer__logo">Tripagram</p>
        <p className="copyright">
          Copyright 2022. Tripagram. All rights reserved.
        </p>
      </div>
      <div className="github">
        <a
          href="https://github.com/codestates-seb/seb40_main_032"
          target="blank"
        >
          <AiFillGithub />
        </a>
      </div>
    </FooterContainer>
  );
}

export default CommonFooter;
