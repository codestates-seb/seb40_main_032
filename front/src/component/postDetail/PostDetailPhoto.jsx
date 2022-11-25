import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import uuid from 'react-uuid';

const nthCss = count => {
  return `
  > img:nth-child(${count + 1}) {
    left: ${count}00%;
  }
  `;
};

const Container = styled.div`
  flex-basis: 60%;
  overflow: hidden;
  height: 100%;
  position: relative;
  border-radius: 1rem 0 0 1rem;
  .image__container {
    display: flex;
    width: 100%;
    height: 0;
    transition: all 0.5s ease-in-out;
    padding-bottom: calc(1050 / 1000 * 100%);
    position: relative;
    left: calc(${props => props.count}* -100%);

    transition: all 500ms linear;
    ${props => props.container}/* > img:nth-child(1) {
      // first-child
      left: 0%;
    }
    > img:nth-child(2) {
      left: 100%;
    }
    > img:nth-child(3) {
      left: 200%;
    }
    > img:nth-child(4) {
      left: 300%;
    }
    > img:nth-child(5) {
      left: 400%;
    } */
  }
  .dot__list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 2rem;
  }
  .image__dot {
    background: hsl(0, 0%, 82.74%);
    border-radius: 100%;
    height: 1rem;
    width: 1rem;
  }
  .image__dot + .image__dot {
    margin-left: 2rem;
  }
  .image__dot--current {
    background: var(--base-white-color);
  }
  @media screen and (max-width: 999px) {
    border-radius: 1rem 1rem 0 0;
    .image__container {
      padding-bottom: calc(600 / 1000 * 100%);
    }
  }

  @media screen and (max-width: 549px) {
    .image__container {
      padding-bottom: calc(1000 / 1000 * 100%);
    }
  }
`;

const PostImg = styled.img`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  transition: all 500ms linear;
  background-color: rgba(0, 0, 0, 0.9);
  object-fit: contain;

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

  const imageLeftFunc = useCallback(() => {
    let str = '';
    photos.map((_, idx) => {
      str += nthCss(idx);
      return str;
    });
    return str;
  }, []);

  return (
    <Container count={count} container={imageLeftFunc()}>
      <LeftBtn size="40" onClick={prev} first={count} />
      <RightBtn
        size="40"
        onClick={next}
        last={photos.length - 1 === count ? 'true' : 'false'}
      />
      <div className="image__container">
        {photos.map(el => {
          return <PostImg key={uuid()} src={el} />;
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
