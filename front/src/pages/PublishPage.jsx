import styled from 'styled-components';
import PublishForm from '../component/publish/PublishForm';

const Publish = styled.main`
  padding: 8rem 20vw;
  @media screen and (max-width: 549px) {
    padding: 8rem 2rem;
  }
`;

function PublishPage() {
  return (
    <Publish>
      <PublishForm />
    </Publish>
  );
}

export default PublishPage;
