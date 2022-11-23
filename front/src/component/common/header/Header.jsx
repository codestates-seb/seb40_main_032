import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Search from './Search';
import HeaderUser from './HeaderUser';

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
    margin: 0 2rem 0 4rem;
  }

  @media screen and (max-width: 549px) {
    height: 6rem;

    .header__container {
      margin: 0 2rem;

      .header__logo > h1 > a {
        font-size: 2.5rem;
      }

      .header__search {
        margin: 0 1.5rem;
      }
    }
  }
`;

function Header({ loginModalOpener }) {
  return (
    <HeaderWrapper className="header">
      <section className="header__container">
        {/* main Logo */}
        <div className="header__logo">
          <h1>
            <Link to="/">Tripagram</Link>
          </h1>
        </div>
        {/* Hedaer Search */}
        <div className="header__search">
          <Search />
        </div>
        {/* post write / user login & user join / user info & user logout */}
        <div className="header__info">
          <HeaderUser loginModalOpener={loginModalOpener} />
        </div>
      </section>
    </HeaderWrapper>
  );
}

export default Header;
