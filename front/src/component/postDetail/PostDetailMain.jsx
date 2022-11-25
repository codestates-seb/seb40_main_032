import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetailPhoto from './PostDetailPhoto';
import PostDetailArticle from './PostDetailArticle';
import Comment from './comment/Comment';
import Loading from '../common/Loading';
import { postDetailApi, postDetailUserApi } from '../../api/postDetailApi';
import { getCookie } from '../../util/cookie';

const Container = styled.main`
  height: 100%;
  margin-top: 8rem;
  padding-top: 5rem;

  display: flex;
  justify-content: center;

  .detail__container {
    max-width: 110rem;
    width: 100%;
    margin: 0 3rem;
  }
  .detail__body {
    margin-bottom: 3rem;
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    position: relative;
    overflow: hidden;
    padding-top: calc(750 / 1200 * 100%);
  }
  .detail__box {
    display: flex;
    justify-content: center;

    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .detail__comment {
    padding-bottom: 2rem;
  }
  .comment__box {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 999px) {
    .detail__body {
      width: 100%;
      height: auto;
      top: 0;
      left: 0;
      position: static;
      overflow: visible;
      padding-top: 0;
      padding: 0 3rem;
    }
    .detail__box {
      flex-direction: column;
      position: static;
      overflow: visible;
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: 549px) {
    padding-top: 2rem;
    .detail__body {
      padding-inline-start: 1rem;
      padding-inline-end: 1rem;
      flex-direction: column;
      align-items: center;
    }
    .detail__box {
      flex-direction: column;
      min-width: 0;
      padding-inline-start: 0;
      padding-inline-end: 0;
      > div {
        width: 100%;
      }
    }
    .detail__comment {
      padding-inline-start: 1rem;
      padding-inline-end: 1rem;
    }
    .detail__container {
      margin: 0;
    }
  }
`;

function PostDetailMain() {
  const boardId = useParams();
  const [postDetail, setPostDetail] = useState('');
  const [loading, setLoading] = useState(true);
  const accountId = getCookie('accountId');
  useEffect(() => {
    if (accountId) {
      postDetailUserApi(boardId.id, accountId)
        .then(res => {
          setPostDetail({
            post: res.post,
            userlike: res.like,
            userfollow: res.follow,
            self: res.self,
          });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      postDetailApi(boardId.id)
        .then(res => {
          setPostDetail({
            post: res.post,
            userlike: '',
            userfollow: '',
            self: '',
          });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <div className="detail__container">
          <div className="detail__body">
            <div className="detail__box">
              <PostDetailPhoto photos={postDetail.post.photos} />
              <PostDetailArticle
                post={postDetail.post}
                userLike={postDetail.userlike}
                userFollow={postDetail.userfollow}
                self={postDetail.self}
                board={boardId.id}
              />
            </div>
          </div>
          <div className="detail__comment">
            <div className="comment__box">
              <Comment />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default PostDetailMain;
