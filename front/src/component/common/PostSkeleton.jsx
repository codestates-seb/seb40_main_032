import styled from 'styled-components';
import skeletonimg from '../../assets/skeleton_img.png';

const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: none;
  flex-basis: 25%;
  padding: 4rem 1.2rem 0;

  .skeleton__container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .skeleton__thumb {
    flex: auto;
    overflow: hidden;
    border-radius: var(--radius-10);

    .skeleton__img {
      width: 100%;
      height: 100%;
    }
  }

  .skeleton__postcard {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    .skeleton__title,
    .skeleton__like,
    .skeleton__tag,
    .skeleton__writer > div {
      background-color: rgb(226, 226, 226);
      border-radius: 8px;
    }

    .skeleton__tl,
    .skeleton__tag,
    .skeleton__writer > div {
      height: 2.5rem;
    }

    .skeleton__tl {
      display: flex;
      justify-content: space-between;
      margin: 5px 0 1rem;

      .skeleton__title {
        width: 100%;
        max-width: 25rem;
        margin-right: 2rem;
      }

      .skeleton__like {
        width: 5rem;
      }
    }

    .skeleton__tw {
      display: flex;
      flex-direction: column;

      .skeleton__tag {
        width: 15rem;
      }
      .skeleton__writer {
        display: flex;
        justify-content: flex-end;
        > div {
          width: 10rem;
        }
      }
    }
  }
`;

function PostSkeleton() {
  return (
    <SkeletonWrapper className="post__skeleton">
      <div className="skeleton__container">
        <div className="skeleton__thumb">
          <img className="skeleton__img" src={skeletonimg} alt="" />
        </div>
        <div className="skeleton__postcard">
          <div className="skeleton__tl">
            <div className="skeleton__title" />
            <div className="skeleton__like" />
          </div>
          <div className="skeleton__tw">
            <div className="skeleton__tag" />
            <div className="skeleton__writer">
              <div />
            </div>
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
}

export default PostSkeleton;
