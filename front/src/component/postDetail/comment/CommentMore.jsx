import { useState } from 'react';
import styled from 'styled-components';
import {
  postDetailCommentModifyApi,
  postDetaulCommentDeleteApi,
} from '../../../api/postDetailApi';

const MoreWrapper = styled.div`
  width: 100%;
  /* height: auto; */
  border-radius: var(--radius-10);
  border: 1px solid var(--font-base-grey);
  margin: 2rem auto;
  font-size: 1.3rem;
  padding: 1rem 2rem 1rem 1rem;

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

    > img {
      cursor: pointer;
      border-radius: 50%;
      object-fit: contain;
    }
  }
  .comment__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    > p {
      cursor: pointer;
    }
  }
  .comment__modify {
    min-width: 5.5rem;
    > ul {
      display: flex;
      justify-content: space-between;
      > li {
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
`;

function CommentMore({
  profile,
  nickName,
  comment,
  accountId,
  commentId,
  watcher,
}) {
  const userId = Number(localStorage.getItem('id'));
  const [modifyComment, setModifyComment] = useState(comment);
  const [modifyFlag, setModifyFlag] = useState(false);
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

  return (
    <MoreWrapper>
      <div className="comment__avatar">
        {/* user avatar */}
        <img src={profile} width="30rem" height="30rem" alt="" />
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
              onChange={e => setModifyComment(e.target.value)}
            />
          ) : (
            <p className="comment__content">{comment}</p>
          )}
        </div>
      </div>
    </MoreWrapper>
  );
}

export default CommentMore;
