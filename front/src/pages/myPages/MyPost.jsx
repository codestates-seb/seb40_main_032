import React from 'react';
import styled from 'styled-components';

const MyPageMain = styled.main`
  padding-top: 20rem;
  > div {
    height: 100vh;
  }
`;

function MyPost() {
  return (
    <MyPageMain>
      <div>MyPost</div>
    </MyPageMain>
  );
}

export default MyPost;
