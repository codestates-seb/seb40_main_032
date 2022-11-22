import styled from 'styled-components';
import uuid from 'react-uuid';
import { GoHeart } from 'react-icons/go';
import { Link } from 'react-router-dom';

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: none;
  flex-basis: 20%;
  padding: 4rem 1.2rem 0;

  .post__container {
    display: flex;
    width: 100%;
    flex-direction: column;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
    border-radius: var(--radius-10);
    overflow: hidden;
    background: #fff;

    .post__thumb {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: calc(313 / 425 * 100%);

      .post__img {
        position: absolute;
        top: 0;
        left: 0;
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
        justify-content: space-between;
        align-items: center;
        padding: 5px 0 1rem;

        .post__title {
          text-align: left;
          font-weight: bold;
          font-size: 1.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          > a {
            color: #333;
          }
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

          .post__avatar {
            display: block;
            width: 2rem;
            height: 2rem;
            margin-right: 5px;
            border-radius: 50%;
            overflow: hidden;

            .post__user {
              width: 100%;
            }
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
function Post({ post }) {
  return (
    <PostWrapper className="post">
      <div className="post__container">
        <div className="post__thumb">
          {/* post Image */}
          <Link to={`/postDetail/${post.boardId}`}>
            <img className="post__img" src={post.thumbnail} alt="게시글" />
          </Link>
        </div>
        <div className="post__card">
          <div className="post__tl">
            {/* title && like */}
            <p className="post__title">
              <Link to={`/postDetail/${post.boardId}`}>{post.title}</Link>
            </p>
            <p className="post__heart">
              <GoHeart className="heart__icon" />
              <span className="heart__count">{post.likeCount}</span>
            </p>
          </div>
          <div className="post__tw">
            {/* tag && user */}
            <ul className="post__tags">
              {post.tags.map(tag => (
                <li key={uuid()} className="post__tag">
                  #{tag}
                </li>
              ))}
            </ul>
            <div className="post__info">
              <span className="post__avatar">
                <img
                  className="post__user"
                  src={post.account.profile}
                  alt="유저"
                />
              </span>
              <p className="post__writer">{post.account.nickname}</p>
            </div>
          </div>
        </div>
      </div>
    </PostWrapper>
  );
}

export default Post;
