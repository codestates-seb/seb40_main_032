import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import categoryData from './categoryData';
import { DefaultButton, TransparentButton } from '../common/button/ButtonStyle';

// 컨테이너
const Container = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  color: var(--font-base-black);
  gap: 4rem;
  > h1 {
    font-size: 2.5rem;
    margin-top: 4vw;
  }
  input,
  textarea {
    width: 100%;
    padding: 1rem;
    border-radius: var(--radius-10);
    border: 1px solid var(--holder-base-color);
    outline-color: var(--button-theme);
    ::placeholder {
      color: var(--holder-base-color);
    }
  }
  label {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-20);
  }
  @media screen and (max-width: 549px) {
    gap: 2rem;
    > h1 {
      font-size: 2rem;
    }
    input {
      margin-top: 5px;
    }
    label {
      color: var(--font-base-black);
      font-size: var(--font-15);
      font-weight: var(--font-semi-bold);
    }
  }
`;

// 사진 - 미구현(임시)
const PhotoContainer = styled.section`
  display: flex;
  flex-wrap: nowrap;
  gap: 2vw;
  @media screen and (max-width: 549px) {
    width: 100%;
    justify-content: space-between;
  }
  .mock-photo {
    display: flex;
    width: 10rem;
    height: 10rem;
    border: 2px dashed burlywood;
    border-radius: 10px;
    margin-bottom: 2px;
    @media screen and (max-width: 549px) {
      width: 30vh;
      height: 25vw;
      flex-basis: 30%;
    }
  }
`;

// 제목 - 입력(필수)
const TitleContainer = styled.section`
  > .title__label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  > .title__input {
  }
`;

// 본문 - 입력(필수)
const ContentContainer = styled.section`
  > .content__label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  > .content__textarea {
    width: 100%;
    height: 30rem;
    resize: none;
    padding: 1rem;
    overflow: hidden;
    border-radius: var(--radius-10);
    border: 1px solid var(--holder-base-color);
    ::placeholder {
      color: var(--holder-base-color);
    }
    @media screen and (max-width: 549px) {
      height: 10rem;
    }
  }
`;

// 글자수검사 - 5자(임시)
const LengthMin = styled.span`
  display: flex;
  align-items: flex-end;
  margin: 0 2px 2px 0;
  font-weight: ${props =>
    props.isValid ? 'var(--font-bold)' : 'var(--font-regular)'};
  color: ${props => (props.isValid ? 'var(--button-theme)' : 'red')};
`;

// 위치 - 입력
const LocationCategoryRow = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  @media screen and (max-width: 549px) {
    flex-direction: column;
  }
`;

const LocationContainer = styled.section`
  width: 100%;
`;

// 카테고리 - 선택(필수:택1)
const CategoryContainer = styled.section`
  width: 100%;
  @media screen and (max-width: 549px) {
    width: 70%;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid var(--holder-base-color);
  border-radius: var(--radius-10);
  padding: 0.5rem;
`;

const Category = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  text-align: center;
  width: 30%;
  border: none;
  border-radius: var(--radius-10);
  font-weight: var(--font-semi-bold);
  opacity: 0.7;
  padding: 0.5rem;
  cursor: pointer;
  &:hover,
  &.isActive {
    opacity: 1;
    font-weight: var(--font-bold);
    transition: 0.2s all ease-in-out;
    box-shadow: var(--bx-sh-two);
  }
`;

// 태그 - 입력, 삭제
const TagContainer = styled.section`
  width: auto;
`;

const TagWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: var(--radius-10);
  border: 1px solid var(--holder-base-color);
  flex-wrap: wrap;
  .tag {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin: 0 0.5rem 0 1rem;
    border-radius: var(--radius-10);
    color: var(--font-base-black);
    font-size: 1.5rem;
    > button {
      text-align: center;
      font-size: 1rem;
      opacity: 0.8;
      background-color: transparent;
      border: none;
      margin-left: 3px;
      color: var(--font-base-black);
      cursor: pointer;
      &:hover {
        scale: calc(1.3);
        transition: 0.1s all linear;
      }
    }
  }
  .tag__input-create {
    border: none;
    flex: 1;
  }
`;

// 버튼 - 등록, 취소
const ButtonContainer = styled.form`
  display: flex;
  justify-content: start;
  span {
    font-size: var(--font-15);
  } /* justify-content: end; 우측 정렬이 나을수도(오른손잡이..) */
`;

const PublishButton = styled(DefaultButton)`
  width: 10vw;
  height: 4vh;
  font-weight: var(--font-bold);
  @media screen and (max-width: 549px) {
    width: 25vw;
    height: 4vh;
  }
  &:hover {
    background: var(--button-theme-hv);
    color: var(--base-white-color);
    transition: 0.1s ease-in-out;
  }
`;

const CancelButton = styled(TransparentButton)`
  width: 10vw;
  font-weight: var(--font-bold);
  @media screen and (max-width: 549px) {
    width: 28vw;
    height: 4vh;
  }
  &:hover {
    color: red;
    transition: 0.1s ease-in-out;
  }
`;

function PublishForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [location, setLocation] = useState();
  const [category, setCategory] = useState();
  const [isActive, setIsActive] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState();

  const MIN_LENGTH = 5;
  const [titleLength, setTitleLength] = useState();
  const [contentLength, setContentLength] = useState();

  const selectHandler = (item, index) => {
    setIsActive(index);
    setTimeout(() => {
      setCategory(item.value);
    }, 0);
  };

  const handleTagAdd = event => {
    const { value } = event.target;
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const filtered = tags.filter(el => el === value);
    if (event.key === 'Enter' || event.key === ',') {
      if (!regex.test(value)) {
        alert('한글, 영어, 숫자로만 입력해주세요');
      }
      if (regex.test(value) && value !== '' && filtered.indexOf(value) === -1) {
        setTags([...tags, value]);
        setTimeout(() => {
          setNewTag('');
        }, 0);
      }
    }
  };

  const handleTagRemove = i => {
    setTags([...tags.filter((_, index) => index !== i)]);
  };

  const handleSubmit = async event => {
    event.prevent.Default();
  };

  return (
    <Container>
      <h1>새 게시물</h1>
      <div className="temporary">
        <PhotoContainer>
          <div className="mock-photo" />
          <div className="mock-photo" />
          <div className="mock-photo" />
        </PhotoContainer>
        <small>*(임시) 업로드 가능한 파일 포맷은 jpg, png입니다.</small>
      </div>

      <TitleContainer>
        <div className="title__label">
          <label htmlFor="title">제목</label>
          <LengthMin isValid={titleLength >= MIN_LENGTH}>
            {titleLength}/{MIN_LENGTH}
          </LengthMin>
        </div>
        <input
          className="title__input"
          type="text"
          id="title"
          name="title"
          value={title || ''}
          maxLength="40"
          onChange={event => {
            setTitle(event.target.value);
            setTitleLength(event.target.value.length);
          }}
          placeholder="제목을 입력하세요"
          required
        />
      </TitleContainer>

      <ContentContainer>
        <div className="content__label">
          <label htmlFor="content">스토리 공유</label>
          <LengthMin isValid={contentLength >= MIN_LENGTH}>
            {contentLength}/{MIN_LENGTH}
          </LengthMin>
        </div>
        <textarea
          className="content__textarea"
          type="text"
          id="content"
          name="content"
          value={content || ''}
          rows="7"
          onChange={event => {
            setContent(event.target.value);
            setContentLength(event.target.value.length);
          }}
          placeholder="이야기를 공유해주세요"
          required
        />
      </ContentContainer>

      <LocationCategoryRow>
        <LocationContainer>
          <label className="location__label" htmlFor="location">
            위치
          </label>
          <input
            className="location__input"
            type="text"
            id="location"
            name="location"
            value={location || ''}
            onChange={event => setLocation(event.target.value)}
            maxLength="20"
            placeholder="위치를 남겨주세요"
          />
        </LocationContainer>

        <CategoryContainer>
          <label htmlFor="category">테마</label>
          <CategoryWrapper id="category">
            {categoryData.map((item, index) => {
              return (
                <Category
                  theme={item.theme}
                  onClick={() => {
                    selectHandler(item, index);
                  }}
                  className={isActive === index ? 'isActive' : null}
                  key={item.id}
                >
                  {item.value}
                </Category>
              );
            })}
          </CategoryWrapper>
        </CategoryContainer>
      </LocationCategoryRow>

      <TagContainer>
        <label htmlFor="tag">태그</label>
        <TagWrapper>
          {tags.map((tag, index) => (
            <li className="tag" key={tag}>
              <span className="tag__name">#{tag}</span>
              <button onClick={() => handleTagRemove(index)}>❌</button>
            </li>
          ))}
          <input
            className="tag__input--create"
            id="tag"
            type="text"
            value={newTag || ''}
            maxLength="6"
            onChange={event => setNewTag(event.target.value)}
            onKeyDown={event => handleTagAdd(event)}
            placeholder="# 태그를 입력하세요"
          />
        </TagWrapper>
      </TagContainer>

      <ButtonContainer>
        <PublishButton
          onClick={() => {
            handleSubmit();
          }}
          disabled={!category}
        >
          <span>등 록</span>
        </PublishButton>
        <CancelButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <span>취 소</span>
        </CancelButton>
      </ButtonContainer>
    </Container>
  );
}

export default PublishForm;
