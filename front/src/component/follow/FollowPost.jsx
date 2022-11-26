import styled from 'styled-components';

const FollowThumb = styled.li`
  flex-basis: 20%;
  padding: 0 1.2rem;

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

function FollowPost() {
  return (
    <FollowThumb>
      <div className="FollowThumb__container">
        <div className="followThumb__img">
          <img
            src="https://source.unsplash.com/random"
            alt="팔로우썸네일이미지"
          />
        </div>
        <div className="followThumb__title">
          <p>남극참치맛있어요</p>
        </div>
      </div>
    </FollowThumb>
  );
}

export default FollowPost;
