import styled from 'styled-components';
import CommonFooter from './CommonFooter';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: 0 0 6px rgb(0 0 0 / 16%);
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: hsl(0, 0%, 100%);

  @media screen and (max-width: 549px) {
    display: none;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <CommonFooter />
    </FooterWrapper>
  );
}

export default Footer;
