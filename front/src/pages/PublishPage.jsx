import styled from 'styled-components';
import Footer from '../component/common/footer/Footer';
import PublishForm from '../component/publish/PublishForm';

const Publish = styled.main`
  padding: 8rem 20vw 3rem;
  @media screen and (max-width: 549px) {
    padding: 8rem 2rem;
  }
`;

function PublishPage() {
  return (
    <>
      <Publish>
        <PublishForm />
      </Publish>
      <Footer />
    </>
  );
}

export default PublishPage;
