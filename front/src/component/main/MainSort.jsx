import styled from 'styled-components';

const MainSortBar = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 10rem;
  padding-top: 5rem;

  @media screen and (max-width: 549px) {
    display: none;
  }

  .main__sortbar {
    display: flex;

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
      }
    }
  }
`;

function MainSort() {
  return (
    <MainSortBar>
      <ul className="main__sortbar">
        <li>
          <button>최신글</button>
        </li>
        <li>
          <button>추천수</button>
        </li>
        <li>
          <button>조회수</button>
        </li>
      </ul>
    </MainSortBar>
  );
}

export default MainSort;
