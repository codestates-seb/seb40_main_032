import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 5rem;
  border-top: 1px solid black;
  position: fixed;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
  background-color: hsl(0, 0%, 100%);
  .footer__container {
    width: 100%;
    height: 100%;
    padding-inline-start: 10rem;
    padding-inline-end: 10rem;
    display: flex;
    justify-content: left;
    align-items: center;
    > p {
      font-size: 1.5rem;
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
        <p>Copyright</p>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
