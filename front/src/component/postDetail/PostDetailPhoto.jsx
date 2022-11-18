import React from 'react';
import styled from 'styled-components';
import PostMockData from './PostMockData';

const Container = styled.div`
  width: 100%;
  height: 70vh;
  flex: 2;
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

function PostDetailPhoto() {
  const mockData = PostMockData;
  // 임시 구현 페이지입니다.

  return (
    <Container>
      <TempImg src={mockData.photos[0]} />
    </Container>
  );
}

export default PostDetailPhoto;
