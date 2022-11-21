import styled from 'styled-components';
import { BiRestaurant, BiHotel, BiMap } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const MainThemeBar = styled.div`
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background: #fff;
  position: fixed;
  z-index: 10;

  .theme__lists {
    display: flex;
    justify-content: center;
    > li {
      margin: 0 2rem;
      color: var(--font-base-grey);

      > button {
        height: 5rem;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        > svg {
          width: 2rem;
          height: 2rem;
        }

        > span {
          font-size: 1.6rem;
          padding-left: 5px;
        }
      }

      &.active {
        color: var(--font-base-black);
        border-bottom: 2px solid var(--font-base-black);
      }
    }
  }
`;

function MainTheme() {
  return (
    <MainThemeBar>
      <ul className="theme__lists">
        <li className="theme__restarant active">
          <button>
            <Link to="/">
              <BiRestaurant />
              <span>맛집</span>
            </Link>
          </button>
        </li>
        <li className="theme__hotel">
          <button>
            <Link to="/stay">
              <BiHotel />
              <span>숙소 </span>
            </Link>
          </button>
        </li>
        <li className="theme__trip">
          <button>
            <Link to="/spot">
              <BiMap />
              <span>여행지</span>
            </Link>
          </button>
        </li>
      </ul>
    </MainThemeBar>
  );
}

export default MainTheme;
