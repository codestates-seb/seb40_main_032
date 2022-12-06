import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  postDetailCommentModifyApi,
  postDetaulCommentDeleteApi,
} from '../../../api/postDetailApi';

const MoreWrapper = styled.div`
  width: 100%;
  border-radius: var(--radius-10);
  border: 1px solid var(--font-base-grey);
  margin: 2rem auto;
  font-size: 1.3rem;
  padding: 1rem 2rem 1rem 1rem;
  word-break: break-all;
  display: flex;

  .comment__user {
    flex: 2;
  }
  .comment__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.1;
    min-width: 6rem;

    > div {
      > img {
        cursor: pointer;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
  .comment__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    > p {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
  .comment__modify {
    min-width: 5.5rem;
    > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        margin-right: 3px;
      }
      > li {
        margin-left: 3px;
        cursor: pointer;
        color: var(--font-base-grey);
        &:hover {
          color: var(--button-theme-hv);
        }
      }
    }
  }
  .modify__input {
    width: 100%;
    border-radius: 5px;
    padding-inline-start: 1rem;
    height: 3rem;
    font-size: var(--font-15);
    font-weight: var(--font-regular);
  }
  .comment__content {
    margin-bottom: 1rem;
  }

  .comment__create {
    text-align: end;
  }
`;

function CommentMore({
  profile,
  nickName,
  comment,
  accountId,
  commentId,
  watcher,
  create,
}) {
  const createAt = new Date(create).toISOString().split('T')[0];
  const userId = Number(localStorage.getItem('accountId'));
  const [modifyComment, setModifyComment] = useState(comment);
  const [modifyFlag, setModifyFlag] = useState(false);
  const navigate = useNavigate();
  // 댓글 삭제 핸들러
  const commentDeleteHandler = () => {
    postDetaulCommentDeleteApi(commentId)
      .then(() => {
        watcher();
      })
      .catch(err => {
        console.log('delete err!');
        console.log(err);
      });
  };
  // 댓글 수정 핸들러
  const commentModifyHandler = () => {
    postDetailCommentModifyApi(commentId, modifyComment)
      .then(() => {
        setModifyFlag(false);
        watcher();
      })
      .catch(err => {
        console.log('modify err!');
        console.log(err);
      });
  };

  const userMovePageHandler = () => {
    navigate(`/mypage/mypost/${accountId}`);
  };

  return (
    <MoreWrapper>
      <div className="comment__avatar">
        {/* user avatar */}
        <div
          onClick={userMovePageHandler}
          onKeyUp={e => {
            if (e.code === 'Enter') {
              userMovePageHandler();
            }
          }}
          tabIndex={0}
          role="button"
        >
          <img src={profile} width="30rem" height="30rem" alt="" />
        </div>
      </div>
      <div className="comment__user">
        <div className="comment__info">
          {/* delte and modify and nickname */}
          <p>{nickName}</p>
          <div className="comment__modify">
            {userId === accountId && (
              <ul>
                {modifyFlag && (
                  <>
                    <div
                      className={
                        modifyComment.length === 250 ? 'comment__max' : ''
                      }
                    >
                      {modifyComment.length}/250
                    </div>
                    <li
                      role="tab"
                      tabIndex={0}
                      onClick={commentModifyHandler}
                      onKeyDown={commentModifyHandler}
                    >
                      확인
                    </li>
                    <li
                      role="tab"
                      tabIndex={0}
                      onClick={() => {
                        setModifyFlag(false);
                      }}
                      onKeyDown={() => {
                        setModifyFlag(false);
                      }}
                    >
                      취소
                    </li>
                  </>
                )}
                {modifyFlag ? null : (
                  <>
                    <li
                      role="tab"
                      tabIndex={0}
                      onClick={() => {
                        setModifyFlag(true);
                      }}
                      onKeyDown={() => {
                        setModifyFlag(true);
                      }}
                    >
                      수정
                    </li>
                    <li
                      role="tab"
                      tabIndex={0}
                      onClick={commentDeleteHandler}
                      onKeyDown={commentDeleteHandler}
                    >
                      삭제
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="comment__body">
          {modifyFlag ? (
            <input
              className="modify__input"
              value={modifyComment}
              maxLength="250"
              onChange={e => setModifyComment(e.target.value)}
            />
          ) : (
            <>
              <p className="comment__content">{comment}</p>
              <p className="comment__create">{createAt}</p>
            </>
          )}
        </div>
      </div>
    </MoreWrapper>
  );
}

export default CommentMore;
