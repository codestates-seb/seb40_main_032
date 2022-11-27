import React, { useState } from 'react';
import styled from 'styled-components';
import MyInfoEditProfile from './MyInfoEditProfile';
import MyInfoEditContent from './MyInfoEditContent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  font-size: 1.5rem;
  color: var(--font-base-grey);
  margin-top: 8rem;
  @media screen and (max-width: 549px) {
    flex-direction: column;
    margin-top: 3em;
    padding: 0 5vw;
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
      <MyInfoEditProfile formData={formData} setFormData={setFormData} />
      <MyInfoEditContent formData={formData} setFormData={setFormData} />
    </Container>
  );
}

export default MyInfoEditForm;
