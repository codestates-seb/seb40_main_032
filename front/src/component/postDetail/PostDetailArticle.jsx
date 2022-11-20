import { useState } from 'react';
import { useSelector } from 'react-redux';
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
import LoginModal from '../common/modal/LoginModal';
import YesNoModal from '../common/modal/YesNoModal';

const Container = styled.div`
  flex: 1;
  color: var(--font-base-black);
  display: flex;
  flex-direction: column;
  padding: 2vh;
  width: 33vw;
  max-height: 70vh;
  height: auto;
  border: 1px solid var(--holder-base-color);
  font-size: var(--font-15);
  .post__category {
    color: var(--font-base-grey);
  }
  @media screen and (max-width: 549px) {
    width: 88vw;
    height: auto;
    padding: 1.5rem 2rem;
  }
`;

const Header = styled.div`
  height: 13%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .writer__info {
    display: flex;
    flex-direction: center;
    align-items: center;
  }
  .writer__avatar {
    display: flex;
    flex-direction: center;
    align-items: center;
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 100rem;
    border: 2px solid black;
    margin-right: 1.5rem;
    cursor: pointer;
  }
  .writer__name {
    font-size: var(--font-20);
    cursor: pointer;
  }
  .follow__button {
    display: flex;
    align-items: center;
    border: none;
    border-radius: var(--radius-10);
    width: auto;
    height: 2.5rem;
    padding: 1rem;
    font-weight: var(--font-semi-bold);
    color: var(--button-theme);
    background-color: var(--button-font-color);
    cursor: pointer;
  }
`;

const Body = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  .article__header {
    font-size: var(--font-20);
    font-weight: var(--font-semi-bold);
    margin-bottom: 1rem;
  }
  .article__content {
    font-size: var(--font-15);
    height: 38vh;
    overflow: scroll;
    margin-right: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .article__location {
    margin-top: 1rem;
  }
  .article__footer {
    margin-top: auto;
    .footer__first {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .footer__tags {
        height: auto;
        display: flex;
        align-items: center;
        color: var(--button-theme);
        font-weight: var(--font-semi-bold);
        width: 65%;
      }
      .tags__list {
        display: flex;
        flex-wrap: wrap;
        > li {
          cursor: pointer;
        }
      }
      .viewlike__wrapper {
        width: 35%;
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
  .button__edit {
    cursor: pointer;
  }
  .button__delete {
    cursor: pointer;
  }
  @media screen and (max-width: 549px) {
    .viewlike__wrapper {
      flex-direction: column;
    }
    .article__content {
      height: 20vh;
    }
    .article__location {
      font-size: var(--font-15);
    }
    .article__footer {
      .footer__first {
        .footer__tags {
          width: 56%;
        }
        .footer__views {
          margin-right: 0px;
        }
        .footer__likes {
          font-size: var(--font-20);
        }
      }
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
  const date = new Date(createdAt).toISOString().split('T')[0];
  const [follow, setFollow] = useState(
    userFollow.follow !== '' ? userFollow.follow : false,
  );
  const [like, setLike] = useState(
    userLike.likes !== '' ? userLike.likes : false,
  );
  const [loginModal, setLoginModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const login = useSelector(state => state.login.isLogin);

  const navigate = useNavigate();
  // 해당회원 정보창으로 이동
  const userMovePageHandler = () => {
    console.log('');
  };

  // 로그인 여부 체크
  const loginCheck = () => {
    if (!login) {
      setLoginModal(true);
      return false;
    }
    return true;
  };
  // login modal close
  const modalClose = () => {
    setLoginModal(false);
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
        position: 'top-center',
        autoClose: 2000,
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
  const postModifyHandler = () => {
    navigate('/publish', { replace: false, state: { post } });
  };

  // tab시 keydown 이벤트 Enter 제어 핸들러
  const keyDownHandler = (e, handler) => {
    if (e.key === 'Enter') {
      handler();
    }
  };
  // login modal notify
  const loginNotify = () =>
    toast('로그인 성공!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <Container>
      {loginModal && (
        <LoginModal modalCloser={modalClose} loginNotify={loginNotify} />
      )}
      {deleteModal && (
        <YesNoModal
          modalMessage="게시글을 정말 삭제하시겠습니까?"
          modalActioner={postDeleteHandler}
          modalCloser={closeDeleteModal}
        />
      )}
      <div className="post__category">{category}</div>
      <Header>
        <div
          className="writer__info"
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
          <div className="writer__name">{account.nickname}</div>
        </div>
        <button className="follow__button" onClick={followHandler}>
          {follow ? '팔로잉중' : '팔로우'}
        </button>
      </Header>
      <Body>
        <div className="article__header">{title}</div>
        <div className="article__content">{content}</div>
        {location ? (
          <div className="article__location"> 위치 : {location}</div>
        ) : null}
        <div className="article__footer">
          <div className="footer__first">
            <div className="footer__tags">
              <ul className="tags__list">
                {tags.map(el => {
                  return <li key={uuid()}>#${el}</li>;
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
