import styled from 'styled-components';
import { MdOutlineLuggage } from 'react-icons/md';
import Search from './Search';
import HeaderUser from './HeaderUser';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 8rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 1px solid var(--font-base-black);
  background-color: #ffffff;

  .header__container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding-inline-start: 10rem;
    padding-inline-end: 10rem;
    max-width: 172rem;
    margin: 0 auto;
  }

  .header__logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header__search {
    flex: 3;
  }
  @media screen and (max-width: 549px) {
    .header__container {
      padding-inline-start: 2.4rem;
      padding-inline-end: 2.4rem;
    }
    .header__info {
      flex: 0.5;
    }
  }
`;

function Header({ loginModalOpener }) {
  return (
    <HeaderWrapper className="header">
      <section className="header__container">
        {/* main Logo */}
        <div className="header__logo">
          {/* <Link to="/"> */}
          <MdOutlineLuggage size="4.3rem" color="hsl(146, 50%, 50%)" />
          {/* </Link> */}
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
