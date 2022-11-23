import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetailPhoto from './PostDetailPhoto';
import PostDetailArticle from './PostDetailArticle';
import Comment from './comment/Comment';
import Loading from '../common/Loading';
import { postDetailApi, postDetailUserApi } from '../../api/postDetailApi';

const Container = styled.main`
  height: 100%;
  margin-top: 8rem;
  padding-top: 5rem;

  .detail__container {
    max-width: 172rem;
    margin: auto;
  }
  .detail__body {
    margin-bottom: 3rem;
    padding-inline-start: 3vw;
    padding-inline-end: 3vw;
    min-width: auto;
  }
  .detail__box {
    display: flex;
    justify-content: center;
  }
  .detail__comment {
    padding-bottom: 2rem;
    padding-inline-start: 3vw;
    padding-inline-end: 3vw;
  }
  .comment__box {
    display: flex;
    justify-content: center;
  }

  /* @media screen and (max-width: 710px) {
    .detail__box {
      flex-direction: column;
    }
  } */

  @media screen and (max-width: 549px) {
    padding-top: 2rem;
    .detail__body {
      padding-inline-start: 2rem;
      padding-inline-end: 2rem;
      flex-direction: column;
      align-items: center;
    }
    .detail__box {
      flex-direction: column;
      min-width: 0;
      > div {
        width: 100%;
      }
    }
    .detail__comment {
      padding-inline-start: 2rem;
      padding-inline-end: 2rem;
    }
  }
`;

function PostDetailMain() {
  const boardId = useParams();
  const [postDetail, setPostDetail] = useState('');
  const [loading, setLoading] = useState(true);
  const accountId = localStorage.getItem('id');
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
