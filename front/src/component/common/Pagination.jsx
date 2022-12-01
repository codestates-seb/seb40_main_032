import styled from 'styled-components';
import uuid from 'react-uuid';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';

const PageButtons = styled.div`
  display: flex;
  margin-bottom: 20rem;
  > button {
    padding: 2px 1.4rem;
    margin: 0 3px;
    font-size: 1.6rem;
    background: #fff;
    color: var(--font-base-grey);
    border: none;
    cursor: pointer;

    &.prev,
    &.next {
      border: 1px solid var(--holder-base-color);
      padding: 5px 8px;
      margin: 0 2rem;
      cursor: not-allowed;
      > svg {
        width: 2rem;
        height: 2rem;
        color: var(--holder-base-color);
        margin-top: 2px;
      }
    }

    &.page__btn:hover {
      color: var(--button-theme);
    }

    /* 페이지 활성화 */
    &.page__btn--active {
      background-color: var(--button-theme);
      color: var(--button-font-color);
    }
    /* prev, next 버튼 활성화 */
    &.arrow__active {
      border: none;
      box-shadow: 0 4px 8px 0 rgb(15 41 77 / 8%);
      cursor: pointer;
      > svg {
        color: var(--font-base-black);
      }
    }
    &.arrow__active:hover {
      background-color: var(--button-theme);
      > svg {
        color: var(--button-font-color);
      }
    }
  }

  @media screen and (max-width: 549px) {
    > button {
      padding: 2px 1.2rem;
      font-size: 1.2rem;

      &.prev,
      &.next {
        margin: 0 1rem;
        > svg {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
    }
  }
`;

function Pagination({ totalLists, currentPage, setCurrentPage, setIsPending }) {
  const listPerPage = 5;
  const totalPages = Math.ceil(totalLists / listPerPage);
  // 전체 페이지 배열
  const totalPageArr = Array(totalPages)
    .fill(1)
    .map((el, idx) => el + idx);
  // 현재 페이지그룹
  const [pageGroup, setPageGroup] = useState([]);
  // prev, next 버튼 활성화 여부
  const prevActive = pageGroup[0] !== 1;
  const nextActive = pageGroup[pageGroup.length - 1] < totalPages;

  useEffect(() => {
    const pageGroupArr = totalPageArr.slice(
      currentPage - 1 - ((currentPage - 1) % 5),
      currentPage - 1 - ((currentPage - 1) % 5) + 5,
    );
    setPageGroup([...pageGroupArr]);
  }, [totalPages]);

  // 이전 페이지 핸들러
  const handlePrev = () => {
    if (!prevActive) return;

    setIsPending(true);
    setCurrentPage(pageGroup[0] - 5);
  };

  // 페이지 핸들러
  const handlePage = e => {
    setIsPending(true);
    setCurrentPage(Number(e.target.value));
  };

  // 다음 페이지 핸들러
  const handleNext = () => {
    if (!nextActive) return;

    setIsPending(true);
    setCurrentPage(pageGroup[0] + 5);
  };

  return (
    <PageButtons>
      {/* 이전 페이지 버튼 */}
      <button
        className={prevActive ? 'prev arrow__active' : 'prev'}
        onClick={handlePrev}
        disabled={!prevActive}
      >
        <HiOutlineChevronLeft />
      </button>

      {/* 페이지 버튼 그룹 */}
      {pageGroup.map(el => (
        <button
          className={el === currentPage ? 'page__btn--active' : 'page__btn'}
          key={uuid()}
          value={el}
          onClick={handlePage}
        >
          {el}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        className={nextActive ? 'next arrow__active' : 'next'}
        onClick={handleNext}
        disabled={!nextActive}
      >
        <HiOutlineChevronRight />
      </button>
    </PageButtons>
  );
}

export default Pagination;
