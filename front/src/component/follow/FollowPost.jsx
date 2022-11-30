import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FollowThumb = styled.li`
  flex-basis: 16.6%;
  padding: 0 1.2rem;

  .FollowThumb__container {
    display: flex;
    flex-direction: column;
  }

  .followThumb__img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: calc(400 / 400 * 100%);
    overflow: hidden;
    border-radius: 1.5rem;
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .followThumb__title {
    width: 100%;
    padding: 5px 5px 0;
    > p {
      color: var(--font-base-black);
      font-size: 1.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }

  @media screen and (max-width: 1440px) {
    flex-basis: 20%;
    &:nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-basis: 25%;
    &:nth-child(5) {
      display: none;
    }
    .followThumb__title {
      > p {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-basis: 33.3%;
    &:nth-child(4) {
      display: none;
    }
  }
`;

function FollowPost({ boards }) {
  return (
    <FollowThumb>
      <Link to={`/postdetail/${boards.id}`}>
        <div className="FollowThumb__container">
          <div className="followThumb__img">
            <img src={boards.thumbnail} alt="팔로우썸네일이미지" />
          </div>
          <div className="followThumb__title">
            <p>{boards.title}</p>
          </div>
        </div>
      </Link>
    </FollowThumb>
  );
}

export default FollowPost;
