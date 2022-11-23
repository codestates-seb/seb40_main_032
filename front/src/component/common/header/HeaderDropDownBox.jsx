import styled from 'styled-components';
import HedaerDropDownItem from './HeaderDropDownItem';

const MenuContainer = styled.div`
  .menu__dropdown {
    position: absolute;
    top: 7.5rem;
    right: -1rem;
    background-color: var(--base-white-color);
    border-radius: 8px;
    padding: 1rem 0px;
    width: 13vw;
    z-index: 10;
    ul {
      > li:first-child {
        display: none;
      }
    }
  }

  /* .menu__dropdown::before {
    position: absolute;
    top: -5px;
    right: 2rem;
    height: 2rem;
    width: 2rem;
    background: var(--base-white-color);
    transform: rotate(45deg);
  } */
  .menu__dropdown ul li {
    padding: 1rem 0px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  .menu__dropdown ul li {
    &:hover {
      a,
      button {
        color: var(--button-theme-hv);
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
  .menu__dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: 500ms ease;
  }

  .menu__dropdown.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2rem);
    transition: 500ms ease;
  }

  @media screen and (max-width: 549px) {
    .menu__dropdown {
      width: 15rem;
      ul {
        > li:first-child {
          text-align: center;
          display: block;
        }
      }
    }
  }
`;

function HeaderDropDownBox({ active, activeHandler }) {
  return (
    <MenuContainer>
      <div className={`menu__dropdown ${active ? 'active' : 'inactive'}`}>
        <ul>
          <HedaerDropDownItem
            linkText="게시물 작성"
            link="/publish"
            activeHandler={activeHandler}
          />
          <HedaerDropDownItem
            linkText="마이 페이지"
            link="/mypage"
            activeHandler={activeHandler}
          />
          <HedaerDropDownItem
            linkText="로그아웃"
            link="/"
            activeHandler={activeHandler}
          />
        </ul>
      </div>
    </MenuContainer>
  );
}

export default HeaderDropDownBox;
