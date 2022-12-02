import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import notFound from '../assets/notFound.png';

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 549px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 5rem;
  }
`;

const ErrorIcon = styled.img`
  width: 18vw;
  min-width: 20rem;
  margin: 4rem;
  @media screen and (max-width: 549px) {
    margin: 2rem;
  }
`;

const ContainerRight = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: var(--font-semi-bold);
  }
  h6 {
    font-size: 2rem;
    font-weight: var(--font-regular);
  }
  @media screen and (max-width: 549px) {
    h1 {
      font-size: 3.5rem;
    }
    h2 {
      font-size: 2rem;
      font-weight: var(--font-semi-bold);
    }
    h6 {
      font-size: 1.5rem;
      font-weight: var(--font-regular);
    }
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: var(--font-regular);
`;

const LinkToMain = styled(Link)`
  color: var(--button-theme-hv);
  :hover {
    text-decoration: underline;
  }
`;

function NotFound() {
  const location = useLocation();
  return (
    <Container>
      <ErrorIcon src={notFound} alt="notfound" />
      <ContainerRight>
        <TextGroup>
          <h1>죄송합니다.</h1>
          <h2>원하시는 페이지를 찾을 수 없습니다.</h2>
          <h6>오류코드 : {location.state === null ? 404 : location.state}</h6>
        </TextGroup>
        <LinkGroup>
          <LinkToMain to="/">메인으로 가기</LinkToMain>
        </LinkGroup>
      </ContainerRight>
    </Container>
  );
}

export default NotFound;
