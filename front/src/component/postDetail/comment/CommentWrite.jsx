import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  postDetailCommentApi,
  postDetailCommentSubmitApi,
} from '../../../api/postDetailApi';
import CommentMore from './CommentMore';
import { loginModalActions } from '../../../redux/loginModalSlice';
import useInput from '../../../hooks/useInput';
// import debounce from '../../../util/debounce';
import LoadingSpinner from '../../common/LoadingSpinner';

const WriteWrapper = styled.article`
  width: 90%;
  height: 100%;
  border-radius: var(--radius-10);
  margin: 2rem auto 1rem auto;
  position: relative;
  .comment__couunt {
    text-align: right;
    padding-right: 1rem;
    width: 100%;
    padding-bottom: 5px;
  }
  .comment__max {
    color: red;
  }
  .comment__sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--base-white-color);
    width: 100%;
    height: 10rem;
  }
  .comment__form {
    display: flex;
    width: 100%;
  }

  .comment__input {
    border-radius: 1rem 0 0 1rem;
    border: 1px solid var(--font-base-grey);
    width: 100%;
    outline: none;
    height: 6.6rem;
    padding-left: 3rem;
    font-size: 2rem;
    border-right: none;
  }

  .comment__button {
    top: 1rem;
    right: 0;
    flex-basis: 15%;
    background-color: transparent;
    border-radius: 0 1rem 1rem 0;
    color: var(--button-theme);
    font-size: 2.2rem;
    font-weight: 700;
    height: 6.6rem;
    border: 1px solid var(--font-base-grey);
    border-left: none;
    cursor: pointer;
  }
  .comment__endPoint {
    height: 2.5rem;
  }
  .comment__zero {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 8rem;
    font-size: 2rem;
  }
  @media screen and (max-width: 549px) {
    width: 100%;
    .comment__sticky {
      height: 8rem;
    }
    .comment__input {
      font-size: 1.5rem;
      height: 5.5rem;
    }
    .comment__button {
      font-size: 1.5rem;
      height: 5.5rem;
      right: 3rem;
    }
    .comment__zero {
      font-size: 1.4rem;
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CommentWrite() {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment, resetComment] = useInput('');
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const login = useSelector(state => state.login.isLogin);
  const dispatch = useDispatch();
  const boardId = useParams();
  const endPointRef = useRef(null);
  const [lastData, setLastData] = useState('');
  // 무한 스크롤 옵저버
  const obsHandler = entries => {
    const target = entries[0];

    if (target.isIntersecting && hasNext) {
      setPage(prev => prev + 1);
    }
  };
  // 무한 스크롤 데이터 요청 핸들러
  const commentListGetHandler = useCallback(
    board => {
      setCommentLoading(true);
      postDetailCommentApi(board, lastData)
        .then(res => {
          const lastContent = res.content[res.content.length - 1];

          setCommentList(prev => {
            return [...prev, ...res.content];
          });
          setHasNext(res.hasNext);
          if (res.hasNext) {
            setLastData(
              `lastCommentId=${lastContent.commentId}&lastCommentCreatedAt=${lastContent.createdAt}`,
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
      setCommentLoading(false);
    },
    [lastData],
  );
  // 무한 스크롤 useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, {
      root: document.getElementsByClassName('comment')[0],
      rootMargin: '0px',
      threshold: 0.7,
    });
    if (endPointRef.current) observer.observe(endPointRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasNext]);

  // 페이지 증가에 따른 데이터 요청
  useEffect(() => {
    if (page !== 0) {
      commentListGetHandler(boardId.id);
    }
  }, [page]);

  // 댓글 삭제 및 수정 wather핸들러
  const deleteModifyWatcherHandler = () => {
    postDetailCommentApi(boardId.id, '', commentList.length)
      .then(res => {
        const lastContent = res.content[res.content.length - 1];
        setCommentList(res.content);
        setLastData(
          `lastCommentId=${lastContent.commentId}&lastCommentCreatedAt=${lastContent.createdAt}`,
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 로그인 여부 체크 핸들러
  const modalOpenHandler = () => {
    if (!login) {
      dispatch(loginModalActions.openLoginModal());
      return false;
    }
    return true;
  };

  // 댓글 작성 핸들러
  const commentSendHandler = () => {
    if (modalOpenHandler() && comment !== '') {
      setCommentLoading(true);
      postDetailCommentSubmitApi(boardId.id, comment)
        .then(() => {
          setHasNext(true);
          setPage(0);
          setLastData('');
          setCommentList(prev => {
            console.log(prev);
            return [];
          });
          resetComment('');

          toast('댓글 입력 성공!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        })
        .catch(err => {
          // toast
          console.log(err);
        });
      setCommentLoading(false);
    }
  };
  // 디바운스 적용 댓글 등록 핸들러
  // const debounceSendHandler = debounce(() => {
  //   commentSendHandler();
  // }, 200);

  return (
    <WriteWrapper className="comment__write">
      <div className="comment__sticky">
        <div
          className={`comment__couunt ${
            comment.length === 250 ? 'comment__max' : ''
          }`}
        >
          {comment.length}/250
        </div>
        <div className="comment__form">
          <input
            className="comment__input"
            placeholder="댓글을 입력 해주세요"
            maxLength="250"
            value={comment}
            onChange={setComment}
            onKeyUp={e => {
              if (e.code === 'Enter' && !commentLoading) {
                commentSendHandler();
                // debounceSendHandler();
              }
            }}
          />
          <button
            className="comment__button"
            onClick={() => {
              if (!commentLoading) {
                commentSendHandler();
              }
            }}
          >
            등록
          </button>
        </div>
      </div>
      {commentLoading ? (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      ) : (
        <>
          {commentList.length === 0 && (
            <div className="comment__zero">
              <p>현재 댓글이 없습니다. 첫 댓글을 달아주세요!😀</p>
            </div>
          )}
          {commentList.map(el => {
            return (
              <CommentMore
                key={el.commentId}
                profile={el.account.profile}
                comment={el.content}
                nickName={el.account.nickname}
                accountId={el.account.accountId}
                commentId={el.commentId}
                create={el.createdAt}
                watcher={deleteModifyWatcherHandler}
              />
            );
          })}
        </>
      )}
      <div className="comment__endPoint" ref={endPointRef} />
    </WriteWrapper>
  );
}

export default CommentWrite;
