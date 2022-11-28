import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import {
  postDetailDeleteApi,
  postDetailFollowApi,
  postDetailLikeApi,
} from '../../api/postDetailApi';
import Like from '../common/like/Like';
import YesNoModal from '../common/modal/YesNoModal';
import { loginModalActions } from '../../redux/loginModalSlice';

const Container = styled.div`
  flex-basis: 40%;
  padding: 1rem 2rem;
  color: var(--font-base-black);
  border: 1px solid var(--holder-base-color);
  font-size: var(--font-15);
  border-radius: 0 1rem 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .post__category {
    color: var(--font-base-grey);
  }
  @media screen and (max-width: 999px) {
    border-radius: 0 0 1rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? 'space-between' : 'flex-start')};
  align-items: center;
  flex-wrap: wrap;
  .image__box {
    width: 3rem;
    height: 3rem;
  }
  .writer__avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
  }
  .writer__name {
    flex-basis: 60%;
    font-size: var(--font-20);
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: ${props => (props.justify ? '-1.5rem' : '1rem')};
  }
  .follow__button {
    flex-basis: 20%;
    height: 3rem;
    font-size: 1.4rem;
    border-radius: var(--radius-10);
    font-weight: var(--font-semi-bold);
    color: var(--button-font-color);
    background-color: var(--button-theme);
    border: none;
    cursor: pointer;
    transition: 500ms linear;
    &:hover {
      color: var(--button-theme-hv);
    }
  }
  .follow__button--active {
    color: var(--button-theme);
    background-color: var(--button-font-color);
  }

  @media screen and (max-width: 999px) {
    .writer__name {
      margin-left: 1rem;
      font-size: 2rem;
      flex-grow: 2;
    }
    .follow__button {
      font-size: 1.6rem;
      flex-basis: 10%;
      min-width: 6.5rem;
    }
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 80%;
  .article__header {
    font-size: 2rem;
    font-weight: var(--font-semi-bold);
    flex-basis: 5%;
    margin-bottom: 1rem;
  }
  .article__content {
    resize: none;
    border: none;
    font-size: var(--font-15);
    flex-basis: 50%;
    flex-grow: 2;
    background-color: var(--base-white-color);
    /* white-space: pre-line; */
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    min-height: 39rem;
    &:focus {
      outline: none;
    }
  }
  .article__location {
    margin: 1rem 0;
  }
  .article__footer {
    flex-wrap: wrap;
    .footer__first {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      .footer__tags {
        display: flex;
        align-items: center;
        color: var(--button-theme);
        font-weight: var(--font-semi-bold);
        width: 100%;
      }
      .tags__list {
        display: flex;
        flex-wrap: wrap;
        > li {
          cursor: pointer;
          margin-right: 4px;
        }
      }
      .viewlike__wrapper {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: flex-end;
      }
      .footer__views {
        font-size: var(--font-10);
        margin-right: 5px;
        color: var(--font-base-grey);
      }
    }
    .footer__second {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 2rem;
      .button__area {
        button {
          font-size: var(--font-15);
          background-color: transparent;
          color: var(--font-base-grey);
          border: none;
          margin-right: 1rem;
        }
      }
    }
  }
  .button__edit,
  .button__delete {
    cursor: pointer;
  }
  @media screen and (max-width: 549px) {
    .article__header {
      font-size: var(--font-20);
      margin: 1rem 0;
    }
  }
`;

function PostDetailArticle({ post, userLike, userFollow, self, board }) {
  const {
    title,
    content,
    location,
    category,
    likeCount,
    views,
    tags,
    createdAt,
    account,
  } = post;
  console.log(self);
  console.log(account);
  const date = new Date(createdAt).toISOString().split('T')[0];
  const [follow, setFollow] = useState(
    userFollow.follow !== '' ? userFollow.follow : false,
  );
  const [like, setLike] = useState(
    userLike.likes !== '' ? userLike.likes : false,
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const login = useSelector(state => state.login.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 해당회원 정보창으로 이동
  const userMovePageHandler = () => {
    navigate(`/mypage/${account.accountId}`);
  };

  // 로그인 여부 체크
  const loginCheck = () => {
    if (!login) {
      dispatch(loginModalActions.openLoginModal());
      return false;
    }
    return true;
  };

  // 좋아요 및 좋아요 취소 핸들러
  const likeHandler = () => {
    if (loginCheck()) {
      postDetailLikeApi(board)
        .then(res => {
          if (res === 'SUCCESS') {
            setLike(true);
            setLikeCountState(prev => prev + 1);
          } else {
            setLike(false);
            setLikeCountState(prev => prev - 1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  // 팔로우 및 팔로우 취소 핸들러
  const followHandler = () => {
    if (loginCheck()) {
      postDetailFollowApi(account.accountId)
        .then(res => {
          if (res === 'SUCCESS') {
            setFollow(true);
          } else {
            setFollow(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  // deleteModal open Handler
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  // deleteModal close Handler
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  // post delete Handler
  const postDeleteHandler = () => {
    postDetailDeleteApi(board).then(() => {
      toast('삭제 되었습니다.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/');
    });
  };
  // 게시글 수정 페이지 이동 핸들러
  const postModifyHandler = () => {
    navigate('/publish', { replace: false, state: { post } });
  };

  // tab시 keydown 이벤트 Enter 제어 핸들러
  const keyDownHandler = (e, handler) => {
    if (e.key === 'Enter') {
      handler();
    }
  };

  return (
    <Container>
      {deleteModal && (
        <YesNoModal
          modalMessage="게시글을 정말 삭제하시겠습니까?"
          modalActioner={postDeleteHandler}
          modalCloser={closeDeleteModal}
        />
      )}
      <div className="post__category">{category}</div>
      <Header justify={!self}>
        <div
          className="image__box"
          role="button"
          tabIndex={0}
          onClick={userMovePageHandler}
          onKeyDown={() => {
            keyDownHandler(userMovePageHandler);
          }}
        >
          <img
            className="writer__avatar"
            src={`${account.profile}`}
            alt="avatar"
          />
        </div>
        <span className="writer__name">{account.nickname}</span>
        {!self && (
          <button
            className={`follow__button follow__button${
              follow ? '--active' : ''
            }`}
            onClick={followHandler}
          >
            {follow ? '팔로잉중' : '팔로우'}
          </button>
        )}
      </Header>
      <Body>
        <p className="article__header">{title}</p>
        <textarea value={content} className="article__content" disabled />
        {location ? (
          <div className="article__location"> 위치 : {location}</div>
        ) : null}
        <div className="article__footer">
          <div className="footer__first">
            <div className="footer__tags">
              <ul className="tags__list">
                {tags.map(el => {
                  return <li key={uuid()}>#{el}</li>;
                })}
              </ul>
            </div>
            <div className="viewlike__wrapper">
              <div className="footer__views">
                <p>조회수 {views}</p>
              </div>
              {like ? (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    keyDownHandler(likeHandler);
                  }}
                  onClick={likeHandler}
                >
                  <Like
                    width="1.5rem"
                    height="1.5rem"
                    color="var(--font-tag-color)"
                    size="1.5rem"
                    ment={likeCountState}
                    marginright="2px"
                    className="footer__likes"
                  />
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    keyDownHandler(likeHandler);
                  }}
                  onClick={likeHandler}
                >
                  <Like
                    width="1.5rem"
                    height="1.5rem"
                    size="1.5rem"
                    ment={likeCountState}
                    marginright="2px"
                    className="footer__likes"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="footer__second">
            {self ? (
              <div className="button__area">
                <button className="button__edit" onClick={postModifyHandler}>
                  수정
                </button>
                <button className="button__delete" onClick={openDeleteModal}>
                  삭제
                </button>
              </div>
            ) : (
              <div />
            )}
            <div className="article__date">{date}</div>
          </div>
        </div>
      </Body>
    </Container>
  );
}

export default PostDetailArticle;
