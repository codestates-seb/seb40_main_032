import styled from 'styled-components';

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  .detail__more {
    cursor: pointer;
    font-size: 1.8rem;
    color: var(--font-base-grey);
  }
  .detail__more--hide {
    display: none;
  }
`;

function CommentDetail({ more, moreEvent }) {
  const moreHandler = () => {
    moreEvent(true);
  };

  return (
    <DetailWrapper onClick={moreHandler}>
      <p className={`detail__more detail__more${more ? '--hide' : ''}`}>
        + 더 보 기
      </p>
    </DetailWrapper>
  );
}

export default CommentDetail;
