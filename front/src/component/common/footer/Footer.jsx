import styled from 'styled-components';
import CommonFooter from './CommonFooter';

const FooterWrapper = styled.footer`
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;

  .footer__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 7rem;
    border-top: 1px solid #ddd;
    background: #f7f7f7;

    .footer__container {
      height: 6rem;
    }

    @media screen and (max-width: 549px) {
      .footer__container {
        height: 8rem;
        margin: 0 2rem;
        > div {
          flex-direction: column;
          padding-right: 5px;

          .copyright {
            padding: 7px 0 0;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <div className="footer__wrapper">
        <CommonFooter />
      </div>
    </FooterWrapper>
  );
}

export default Footer;
