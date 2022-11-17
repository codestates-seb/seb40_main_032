import { useState } from 'react';
import styled from 'styled-components';
import PostMockData from './PostMockData';
import Like from '../common/like/Like';

const Container = styled.div`
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
    height: 2%;
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
  }
  .writer__name {
    font-size: var(--font-20);
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

function PostDetailArticle() {
  const mockData = PostMockData;
  const [follow, setFollow] = useState('');

  return (
    <Container>
      <div className="post__category">{mockData.category}</div>
      <Header>
        <div className="writer__info">
          <img
            className="writer__avatar"
            src={`${mockData.account.profile}`}
            alt="avatar"
          />
          <div className="writer__name">{mockData.account.nickname}</div>
        </div>
        <button
          className="follow__button"
          onClick={() => {
            setFollow(!follow);
          }}
        >
          {follow ? '팔로우' : '팔로잉중'}
        </button>
      </Header>
      <Body>
        <div className="article__header">{mockData.title}</div>
        <div className="article__content">{mockData.content}</div>
        {mockData.location ? (
          <div className="article__location"> 위치 : {mockData.location}</div>
        ) : null}
        <div className="article__footer">
          <div className="footer__first">
            <div className="footer__tags">
              {mockData.tags.map(el => ` #${el}`)}
            </div>
            <div className="viewlike__wrapper">
              <div className="footer__views">
                <p>조회수 {mockData.views}</p>
              </div>
              <Like
                width="1.5rem"
                height="1.5rem"
                color="var(--font-tag-color)"
                size="1.5rem"
                ment={mockData.likeCount}
                marginRight="2px"
                className="footer__likes"
              />
            </div>
          </div>
          <div className="footer__second">
            {mockData.myBoard ? (
              <div className="button__area">
                <button className="button__edit">수정</button>
                <button className="button__delete">삭제</button>
              </div>
            ) : (
              <div />
            )}
            <div className="article__date">{mockData.createdAt}</div>
          </div>
        </div>
      </Body>
    </Container>
  );
}

export default PostDetailArticle;
