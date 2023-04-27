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
  const [hasNext, setHasNext] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const login = useSelector(state => state.login.isLogin);
  const dispatch = useDispatch();
  const boardId = useParams();
  const endPointRef = useRef(null);
  const [lastData, setLastData] = useState('');

  // 무한 스크롤 데이터 요청 핸들러
  const commentListGetHandler = useCallback(async (board, last) => {
    await postDetailCommentApi(board, last)
      .then(res => {
        console.log(`In : ${last}`);
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
        setCommentLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 무한 스크롤 옵저버
  const obsHandler = entries => {
    const target = entries[0];
    console.log(commentList);
    if (target.isIntersecting && hasNext) {
      console.log(`lastData :${lastData}`);
      commentListGetHandler(boardId.id, lastData);
    }
  };

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
  }, [hasNext, lastData]);

  // 댓글 삭제 및 수정 wather핸들러
  const deleteModifyWatcherHandler = () => {
    postDetailCommentApi(boardId.id, '', commentList.length)
      .then(res => {
        const lastContent = res.content[res.content.length - 1];
        setCommentList(res.content);
        setLastData(() => {
          if (lastContent) {
            return `lastCommentId=${lastContent.commentId}&lastCommentCreatedAt=${lastContent.createdAt}`;
          }
          return '';
        });
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
  const commentSendHandler = e => {
    e.preventDefault();
    if (modalOpenHandler() && comment !== '') {
      setCommentLoading(true);
      setHasNext(false);
      postDetailCommentSubmitApi(boardId.id, comment)
        .then(() => {
          setHasNext(true);
          setCommentList([]);
          setLastData('');
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
          console.log(err);
        });
    }
  };

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
        <form className="comment__form" onSubmit={commentSendHandler}>
          <input
            className="comment__input"
            placeholder="댓글을 입력 해주세요"
            maxLength="250"
            value={comment}
            onChange={setComment}
          />
          <button
            type="submit"
            className="comment__button"
            disabled={commentLoading}
          >
            등록
          </button>
        </form>
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
