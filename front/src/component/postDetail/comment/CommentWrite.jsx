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
import Loading from '../../common/Loading';
import useInput from '../../../hooks/useInput';

const WriteWrapper = styled.article`
  width: 90%;
  height: 100%;
  border-radius: var(--radius-10);
  margin: 2rem auto 1rem auto;
  position: relative;
  .comment__input {
    width: 100%;
    border: 1px solid var(--font-base-grey);
    border-radius: var(--radius-10);
    outline: none;
    height: 6.6rem;
    padding-left: 3rem;
    padding-right: 7.5rem;
    font-size: 2rem;
  }

  .comment__button {
    position: absolute;
    top: 1.4rem;
    right: 3rem;
    border: none;
    background-color: transparent;
    color: var(--button-theme);
    font-size: 2.2rem;
    font-weight: 800;
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
    .comment__input {
      font-size: 1.5rem;
      height: 5.5rem;
    }
    .comment__button {
      font-size: 1.5rem;
      right: 3rem;
    }
  }
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
  // 무한 스크롤 옵저버
  const obsHandler = entries => {
    const target = entries[0];

    if (target.isIntersecting && hasNext) {
      setPage(prev => prev + 1);
    }
  };
  // 무한 스크롤 데이터 요청 핸들러
  const commentListGetHandler = useCallback((board, val = 1) => {
    postDetailCommentApi(board, val).then(res => {
      setCommentLoading(true);
      setCommentList(prev => [...prev, ...res.content]);
      setHasNext(res.hasNext);
      setCommentLoading(false);
    });
  }, []);
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
      commentListGetHandler(boardId.id, page);
    }
  }, [page]);

  // 댓글 삭제 및 수정 wather핸들러
  const deleteModifyWatcherHandler = () => {
    postDetailCommentApi(boardId.id, 1, commentList.length)
      .then(res => {
        setCommentList(res.content);
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
      postDetailCommentSubmitApi(boardId.id, comment)
        .then(() => {
          setCommentLoading(true);
          setHasNext(true);
          setPage(0);
          setCommentList([]);
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
          setCommentLoading(false);
        })
        .catch(err => {
          // toast
          console.log(err);
        });
    }
  };

  return (
    <WriteWrapper className="comment__write">
      <input
        className="comment__input"
        placeholder="댓글을 입력 해주세요"
        value={comment}
        onChange={setComment}
        onKeyUp={e => {
          if (e.code === 'Enter') {
            commentSendHandler();
          }
        }}
      />
      <button
        className="comment__button"
        onClick={() => {
          commentSendHandler();
        }}
      >
        등록
      </button>
      {commentLoading ? (
        <Loading />
      ) : (
        <>
          {!commentList.length && (
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
