import styled from 'styled-components';
import { BiRestaurant, BiHotel, BiMap } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MainThemeBar = styled.div`
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background: #fff;
  position: fixed;
  z-index: 10;
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

    .theme__restarant.active ~ .bar {
      left: 9px;
      opacity: 1;
    }

    .theme__hotel.active ~ .bar {
      left: 10.3rem;
      opacity: 1;
    }

    .theme__trip.active ~ .bar {
      left: 20.4rem;
      opacity: 1;
    }
  }
`;

function MainTheme() {
  const activInitState = {
    restaurant: true,
    stay: false,
    spot: false,
  };
  const [isActive, setIsActive] = useState(activInitState);

  return (
    <MainThemeBar>
      <ul className="theme__lists">
        <li
          className={
            isActive.restaurant ? 'theme__restarant active' : 'theme__restarant'
          }
        >
          <button
            onClick={() =>
              setIsActive({
                ...isActive,
                restaurant: true,
                stay: false,
                spot: false,
              })
            }
          >
            <Link to="/">
              <BiRestaurant />
              <span>맛집</span>
            </Link>
          </button>
        </li>
        <li className={isActive.stay ? 'theme__hotel active' : 'theme__hotel'}>
          <button
            onClick={() =>
              setIsActive({
                ...isActive,
                restaurant: false,
                stay: true,
                spot: false,
              })
            }
          >
            <Link to="/stay">
              <BiHotel />
              <span>숙소 </span>
            </Link>
          </button>
        </li>
        <li className={isActive.spot ? 'theme__trip active' : 'theme__trip'}>
          <button
            onClick={() =>
              setIsActive({
                ...isActive,
                restaurant: false,
                stay: false,
                spot: true,
              })
            }
          >
            <Link to="/spot">
              <BiMap />
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
