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
  padding-top: 8rem;
  .detail__container {
    margin: 0 auto;
    padding-inline-start: 10rem;
    padding-inline-end: 10rem;
    max-width: 160rem;
  }
  .detail__body {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .detail__comment {
    padding-bottom: 2rem;
  }
  @media screen and (max-width: 549px) {
    padding-top: 4rem;
    .detail__container {
      padding-inline-start: 2rem;
      padding-inline-end: 2rem;
    }
    .detail__body {
      flex-direction: column;
      align-items: center;
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
            <PostDetailPhoto photos={postDetail.post.photos} />
            <PostDetailArticle
              post={postDetail.post}
              userLike={postDetail.userlike}
              userFollow={postDetail.userfollow}
              self={postDetail.self}
              board={boardId.id}
            />
          </div>
          <div className="detail__comment">
            <Comment />
          </div>
        </div>
      )}
    </Container>
  );
}

export default PostDetailMain;
