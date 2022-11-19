import styled from 'styled-components';
/* 디폴트 3개 이후에 더보기를 클릭 시 5개 정도를 더 보여주고 스크롤을 계속 내릴 시 무한 스크롤로 데이터를 보여준다. */
import { FaUserCircle } from 'react-icons/fa';

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
    > svg {
      cursor: pointer;
    }
  }
  .comment__info {
    display: flex;
    justify-content: space-between;
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
`;

function CommentMore() {
  return (
    <MoreWrapper>
      <div className="comment__avatar">
        {/* user avatar */}
        <FaUserCircle size="4rem" />
      </div>
      <div className="comment__user">
        <div className="comment__info">
          {/* delte and modify and nickname */}
          <p>nickName</p>
          <div className="comment__modify">
            <ul>
              <li>수정</li>
              <li>삭제</li>
            </ul>
          </div>
        </div>
        <div className="comment__body">
          <p>
            css hell css hell css hell css hell css hell css hell css hell css
            hell css hell css hell css hell css hell css hell css hell
          </p>
        </div>
      </div>
    </MoreWrapper>
  );
}

export default CommentMore;
