import styled from 'styled-components';
import Search from './Search';
import HeaderUser from './HeaderUser';
import TripaLogo from '../../../assets/favicon.png';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 8rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 1px solid var(--holder-base-color);
  background-color: #ffffff;

  .header__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 172rem;
    margin: 0 4rem;
    div > a > img {
      display: none;
    }
  }

  .header__logo {
    > h1 {
      height: 100%;
      display: flex;
      align-items: center;
      > a {
        font-family: 'Lobster', cursive;
        color: var(--button-theme);
        font-size: 3.5rem;
      }
    }
  }
  .header__search {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2rem 0 2rem;
  }

  @media screen and (max-width: 549px) {
    height: 6rem;

    .header__container {
      margin: 0 2rem;
      > div {
        padding: 1.5rem 0rem;
        > a > img {
          display: block;
          width: 3rem;
        }
      }
      .header__logo > h1 {
        display: none;
      }
      .header__search {
        margin: 0 1.5rem;
      }
    }
  }
`;
function Header() {
  return (
    <HeaderWrapper className="header">
      <section className="header__container">
        <div>
          <a href="/">
            <img src={TripaLogo} alt="responsive logo" />
          </a>
        </div>
        <div className="header__logo">
          <h1>
            <a href="/">Tripagram</a>
          </h1>
        </div>
        <div className="header__search">
          <Search />
        </div>
        <div className="header__info">
          <HeaderUser />
        </div>
      </section>
    </HeaderWrapper>
  );
}

export default Header;
