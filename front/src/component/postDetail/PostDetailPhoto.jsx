import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
// import PostMockData from './PostMockData';
import uuid from 'react-uuid';

const Container = styled.div`
  width: 100%;
  height: 70vh;
  flex: 2;
  overflow: hidden;
  position: relative;
  .image__container {
    display: flex;
    width: 100%;
    height: 70vh;
    flex: 2;
    transition: all 0.5s ease-in-out;
    margin-left: -${props => props.count}%;
    position: relative;
  }
  .dot__list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    position: absolute;
    bottom: 10px;
  }
  .image__dot {
    background: hsl(0, 0%, 82.74%);
    border-radius: 100%;
    height: 10px;
    width: 10px;
  }
  .image__dot + .image__dot {
    margin-left: 20px;
  }
  .image__dot--current {
    background: var(--base-white-color);
  }
  @media screen and (max-width: 549px) {
    width: 88vw;
    height: 32rem;
  }
`;

const TempImg = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
  border: 1px solid var(--holder-base-color);
  border-right: none;
  @media screen and (max-width: 549px) {
    border: 1px solid var(--holder-base-color);
    border-bottom: none;
  }
`;
const arrowStyle = css`
  position: absolute;
  top: calc(100% / 2);
  transform: translate(0, -50%);
  z-index: 2;
  cursor: pointer;

  &:hover {
    & > path {
      color: var(--base-white-color);
    }
  }
`;

const LeftBtn = styled(IoIosArrowDropleft)`
  ${arrowStyle}
  left: 10px;
  display: ${props => (props.first === 0 ? 'none' : 'block')};
`;

const RightBtn = styled(IoIosArrowDropright)`
  ${arrowStyle}
  right: 10px;
  display: ${props => (props.last === 'true' ? 'none' : 'block')};
`;

function PostDetailPhoto({ photos }) {
  const [count, setCount] = useState(0);
  const prev = () => {
    setCount(prevValue => prevValue - 1);
  };
  const next = () => {
    setCount(nextvalue => nextvalue + 1);
  };

  return (
    <Container count={`${count}00`}>
      <LeftBtn size="40" onClick={prev} first={count} />
      <RightBtn
        size="40"
        onClick={next}
        last={photos.length - 1 === count ? 'true' : 'false'}
      />
      <div className="image__container">
        {photos.map(el => {
          return <TempImg key={uuid()} src={el} />;
        })}
      </div>
      <div className="dot__list">
        {photos.map((el, idx) => {
          return (
            <div
              key={uuid()}
              className={`image__dot image__dot${
                count === idx ? '--current' : ''
              }`}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default PostDetailPhoto;
