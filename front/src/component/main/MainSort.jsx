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
    margin: 2rem 3rem;

    > li {
      margin-right: 1.5rem;
      position: relative;

      &::after {
        position: absolute;
        top: 1px;
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
      }
    }
  }
`;

function MainSort({ sortHandler }) {
  return (
    <MainSortBar>
      <ul className="main__sortbar">
        <li>
          <button
            onClick={() => {
              sortHandler('createdAt,desc');
            }}
          >
            최신글
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              sortHandler('likeCount,desc');
            }}
          >
            추천수
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              sortHandler('views,desc');
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
