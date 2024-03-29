import styled from 'styled-components';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import CommentLike from './CommentLike';

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: none;
  flex-basis: 20%;
  padding: 0 1.2rem 3rem;

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
        object-fit: cover;
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
        padding-bottom: 5px;

        .post__title {
          text-align: left;
          font-weight: 500;
          font-size: 1.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          > a {
            color: #333;
            &:hover {
              font-weight: 600;
            }
          }
        }
      }

      .post__tw {
        display: flex;
        flex-direction: column;

        .post__tags {
          height: 4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;

          .post__tag {
            display: inline;
            padding-right: 1rem;
            text-align: left;
            color: var(--font-tag-color);
            font-size: 1.3rem;
            line-height: 1.5;
          }
        }
        .post__info {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .post__avatar {
            display: block;
            width: 2rem;
            height: 2rem;
            margin-right: 5px;
            border-radius: 50%;
            overflow: hidden;

            .post__user {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .post__writer {
            max-width: 18rem;
            font-size: 1.3rem;
            color: var(--font-base-black);
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
      }
    }
  }
  @media screen and (max-width: 549px) {
    padding: 0 2rem 3rem;
  }
`;
function Post({ post }) {
  return (
    <PostWrapper className="post">
      <div className="post__container">
        <div className="post__thumb">
          <Link to={`/postDetail/${post.boardId}`}>
            <img
              className="post__img"
              src={post.thumbnail}
              alt="스토리썸네일이미지"
            />
          </Link>
          <CommentLike
            view={post.views}
            like={post.likeCount}
            comment={post.commentCount}
          />
        </div>
        <div className="post__card">
          <div className="post__tl">
            <p className="post__title">
              <Link to={`/postDetail/${post.boardId}`}>{post.title}</Link>
            </p>
          </div>
          <div className="post__tw">
            <ul className="post__tags">
              {post.tags.map(tag => (
                <li key={uuid()} className="post__tag">
                  #{tag}
                </li>
              ))}
            </ul>
            <div className="post__info">
              <Link to={`/mypage/mypost/${post.account.accountId}`}>
                <span className="post__avatar">
                  <img
                    referrerPolicy="no-referrer"
                    className="post__user"
                    src={post.account.profile}
                    alt="유저"
                  />
                </span>
              </Link>
              <Link to={`/mypage/mypost/${post.account.accountId}`}>
                <p className="post__writer">{post.account.nickname}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PostWrapper>
  );
}

export default Post;
