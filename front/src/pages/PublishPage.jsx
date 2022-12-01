import styled from 'styled-components';
import PublishForm from '../component/publish/PublishForm';
import MetaTag from '../util/MetaTag';

const Publish = styled.main`
  padding: 8rem 20vw;
  @media screen and (max-width: 549px) {
    padding: 8rem 2rem;
  }
`;

function PublishPage() {
  return (
    <Publish>
      <MetaTag
        title="나만의 여행 정보 공유 - Tripagram"
        description="자신만이 알고 있는 여행 장소, 음식점, 숙소에 대해서 공유해주세요"
        keywords="여행, 숙소, 장소, 공유, 등록"
      />
      <PublishForm />
    </Publish>
  );
}

export default PublishPage;
