import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 5rem;
  box-shadow: 0 0 6px rgb(0 0 0 / 16%);
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: hsl(0, 0%, 100%);
  .footer__container {
    width: 100%;
    max-width: 172rem;
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
  }
  @media screen and (max-width: 549px) {
    display: none;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <div className="footer__container">
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
      </div>
    </FooterWrapper>
  );
}

export default Footer;
