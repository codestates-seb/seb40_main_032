import styled from 'styled-components';

const MainSortBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 549px) {
    display: none;
  }

  .main__sortbar {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 172rem;
    margin: 2rem 1vw;

    > li {
      margin-right: 1.5rem;
      position: relative;

      &::after {
        position: absolute;
        top: 4px;
        left: 4.2rem;
        content: '';
        width: 1px;
        height: 1.3rem;
        background: var(--font-base-black);
      }
      &:last-child::after {
        display: none;
      }

      > button {
        background: none;
        border: none;
        cursor: pointer;
        &:hover {
          font-weight: 600;
          transition: all 0.3s;
        }
        &.sort__active {
          font-weight: bold;
          color: var(--button-theme);
        }
      }
    }
  }
`;

function MainSort({ sort, sortHandler }) {
  return (
    <MainSortBar>
      <ul className="main__sortbar">
        <li>
          <button
            className={sort === 'createdAt,desc' ? 'sort__active' : undefined}
            onClick={() => {
              if (sort !== 'createdAt,desc') {
                sortHandler('createdAt,desc');
              }
            }}
          >
            최신글
          </button>
        </li>
        <li>
          <button
            className={sort === 'likeCount,desc' ? 'sort__active' : undefined}
            onClick={() => {
              if (sort !== 'likeCount,desc') {
                sortHandler('likeCount,desc');
              }
            }}
          >
            추천수
          </button>
        </li>
        <li>
          <button
            className={sort === 'views,desc' ? 'sort__active' : undefined}
            onClick={() => {
              if (sort !== 'views,desc') {
                sortHandler('views,desc');
              }
            }}
          >
            조회수
          </button>
        </li>
      </ul>
    </MainSortBar>
  );
}

export default MainSort;
