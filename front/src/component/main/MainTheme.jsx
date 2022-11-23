import styled from 'styled-components';
import { BiRocket, BiRestaurant, BiHotel, BiMapPin } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const MainThemeBar = styled.div`
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background: #fff;
  position: fixed;
  z-index: 9;
  display: flex;
  justify-content: center;

  .theme__lists {
    display: flex;
    justify-content: center;
    position: relative;
    > li {
      margin: 0 2rem;
      color: var(--font-base-grey);

      > button {
        height: 5rem;
        background: none;
        border: none;
        display: flex;
        > a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          color: var(--font-base-grey);
          > svg {
            width: 2rem;
            height: 2rem;
          }

          > span {
            font-size: 1.6rem;
            padding-left: 5px;
          }
        }
      }

      &.active > button > a {
        color: var(--font-base-black);
        > svg {
          fill: var(--button-theme);
        }
      }
    }

    .bar {
      position: absolute;
      bottom: 0;
      width: 8rem;
      height: 3px;
      margin: 0;
      background: var(--button-theme);
      opacity: 0;
      transition: all 0.5s;
    }

    .theme__all.active ~ .bar {
      left: 1.1rem;
      opacity: 1;
    }

    .theme__restaurant.active ~ .bar {
      left: 10.4rem;
      opacity: 1;
    }

    .theme__hotel.active ~ .bar {
      left: 19.6rem;
      opacity: 1;
    }

    .theme__trip.active ~ .bar {
      left: 29.7rem;
      opacity: 1;
    }
  }

  @media screen and (max-width: 549px) {
    .theme__lists > li {
      margin: 0 1rem;
      > button {
        height: 4rem;
        > a > span {
          font-size: 1.4rem;
        }
      }

      &.bar {
        width: 6rem;
      }
      &.theme__restaurant.active ~ .bar {
        left: 7.8rem;
      }

      &.theme__hotel.active ~ .bar {
        left: 14.3rem;
      }

      &.theme__trip.active ~ .bar {
        width: 7rem;
        left: 21.5rem;
      }
    }
  }
`;

function MainTheme() {
  const { pathname } = useLocation();

  return (
    <MainThemeBar>
      <ul className="theme__lists">
        <li className={pathname === '/' ? 'theme__all active' : 'theme__all'}>
          <button>
            <Link to="/">
              <BiRocket />
              <span>전체</span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/restaurant'
              ? 'theme__restaurant active'
              : 'theme__restaurant'
          }
        >
          <button>
            <Link to="/restaurant">
              <BiRestaurant />
              <span>맛집</span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/stay' ? 'theme__hotel active' : 'theme__hotel'
          }
        >
          <button>
            <Link to="/stay">
              <BiHotel />
              <span>숙소 </span>
            </Link>
          </button>
        </li>
        <li
          className={
            pathname === '/spot' ? 'theme__trip active' : 'theme__trip'
          }
        >
          <button>
            <Link to="/spot">
              <BiMapPin />
              <span>여행지</span>
            </Link>
          </button>
        </li>
        <li className="bar" />
      </ul>
    </MainThemeBar>
  );
}

export default MainTheme;
