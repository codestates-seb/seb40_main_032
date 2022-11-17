import styled from 'styled-components';
import uuid from 'react-uuid';
import { GoHeart } from 'react-icons/go';

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: none;
  flex-basis: 25%;
  padding: 4rem 1.2rem 0;

  .post__container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
    border-radius: var(--radius-10);
    overflow: hidden;
    background: #fff;

    .post__thumb {
      flex: auto;
      overflow: hidden;
      cursor: pointer;

      .post__img {
        width: 100%;
        height: 100%;
        transition: all 300ms linear;
        &:hover {
          transform: scale(1.03);
        }
      }
    }

    .post__card {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.5rem;

      .post__tl {
        display: flex;
        align-items: center;
        padding: 5px 0 1rem;

        .post__title {
          flex-grow: 2;
          text-align: left;
          font-weight: bold;
          font-size: 1.6rem;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }

        .post__heart {
          display: flex;
          align-items: center;
          padding-left: 5px;

          .heart__icon {
            width: 2rem;
            height: 2rem;
            fill: var(--button-theme);
          }

          .heart__count {
            font-size: 1.4rem;
            color: var(--button-theme);
            padding-left: 2px;
            margin-top: -1px;
          }
        }
      }

      .post__tw {
        display: flex;
        flex-direction: column;

        .post__tags {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .post__tag {
            padding-right: 1rem;
            text-align: left;
            color: var(--font-tag-color);
            font-size: 1.3rem;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
        .post__info {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 1rem 0 5px;
          cursor: pointer;

          .post__avatar {
            display: block;
            width: 2rem;
            height: 2rem;
            margin-right: 5px;
            border-radius: 50%;
            overflow: hidden;
          }

          .post__writer {
            font-size: 1.3rem;
          }
        }
      }
    }
  }
`;
// { image, title, like, tag, user }
function Post() {
  return (
    <PostWrapper className="post">
      <div className="post__container">
        <div className="post__thumb">
          {/* post Image */}
          <img
            className="post__img"
            src="https://source.unsplash.com/random/425x300"
            alt="게시글"
          />
        </div>
        <div className="post__card">
          <div className="post__tl">
            {/* title && like */}
            <p className="post__title">
              안녕 나는 제목이야 안녕 나는 제목이야 안녕 나는 제목이야
            </p>
            <p className="post__heart">
              <GoHeart className="heart__icon" />
              <span className="heart__count">5</span>
            </p>
          </div>
          <div className="post__tw">
            {/* tag && user */}
            <ul className="post__tags">
              {/* tag.map(el => {
            <li key={uuid()} className="post__tag">el</li>
          }) */}
              <li key={uuid()} className="post__tag">
                #태그는6글자
              </li>
              <li key={uuid()} className="post__tag">
                #이하로만가능
              </li>
              <li key={uuid()} className="post__tag">
                #하도록해야지
              </li>
            </ul>
            <div className="post__info">
              <span className="post__avatar">
                <img
                  className="post__user"
                  src="https://source.unsplash.com/random/20x20/"
                  alt="유저"
                />
              </span>
              <p className="post__writer">안녕나는유저야</p>
            </div>
          </div>
        </div>
      </div>
    </PostWrapper>
  );
}

export default Post;
