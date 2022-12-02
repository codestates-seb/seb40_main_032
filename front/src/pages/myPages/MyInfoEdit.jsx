import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyInfoEditForm from '../../component/myInfoEdit/MyInfoEditForm';

const MyPageMain = styled.main`
  padding-top: 22rem;
  max-width: 172rem;
  margin: 0 3rem;
  width: 90%;

  @media screen and (max-width: 549px) {
    padding-top: 15rem;
    margin: 0 1rem;
  }
`;

function MyInfoEdit() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const accountIdCookie = localStorage.getItem('accountId');

  useEffect(() => {
    if (accountId !== accountIdCookie) {
      navigate('*');
    }
    return () => {};
  }, []);

  return (
    <MyPageMain>
      <MyInfoEditForm />
    </MyPageMain>
  );
}

export default MyInfoEdit;
