import React, { useState } from 'react';
import styled from 'styled-components';
import MyInfoEditProfile from './MyInfoEditProfile';
import MyInfoEditContent from './MyInfoEditContent';
import MetaTag from '../../util/MetaTag';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: var(--font-base-grey);
  margin-top: 5vh;
  @media screen and (max-width: 549px) {
    flex-direction: column;
    margin-top: 4rem;
  }
`;

function MyInfoEditForm() {
  const [formData, setFormData] = useState({
    password: '',
    nickname: '',
    intro: '',
    profile: '',
  });

  return (
    <Container>
      <MetaTag title="마이페이지:정보수정 - Tripagram" />
      <MyInfoEditProfile formData={formData} setFormData={setFormData} />
      <MyInfoEditContent formData={formData} setFormData={setFormData} />
    </Container>
  );
}

export default MyInfoEditForm;
