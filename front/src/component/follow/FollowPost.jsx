import styled from 'styled-components';

const FollowThumb = styled.li`
  flex-basis: 20%;
  padding: 0 1.2rem;

  @media screen and (max-width: 1440px) {
    flex-basis: 25%;
    &:nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-basis: 33.3%;
    &:nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    flex-basis: 50%;
    &:nth-child(3) {
      display: none;
    }
  }

  @media screen and (max-width: 549px) {
    margin: 0 1rem;
    flex-basis: 100%;
    &:nth-child(2) {
      display: none;
    }
  }

  .FollowThumb__container {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-10);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
    overflow: hidden;
  }

  .followThumb__img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: calc(300 / 400 * 100%);
    overflow: hidden;
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .followThumb__title {
    width: 100%;
    height: 8rem;
    padding: 1.5rem;
    > p {
      font-size: 1.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
`;

function FollowPost({ boards }) {
  return (
    <FollowThumb>
      <div className="FollowThumb__container">
        <div className="followThumb__img">
          <img src={boards.thumbnail} alt="팔로우썸네일이미지" />
        </div>
        <div className="followThumb__title">
          <p>{boards.title}</p>
        </div>
      </div>
    </FollowThumb>
  );
}

export default FollowPost;
