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
