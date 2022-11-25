import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import PublishPhoto from './PublishPhoto';
import PublishLocCat from './PublishLocCat';
import PublishTags from './PublishTags';
import PublishModalButton from './PublishModalButton';

function PublishForm() {
  const loc = useLocation().state;
  const isPublishPage = loc === null; // 작성/수정페이지 구분
  const ref = useRef(); // 자식 컴포넌트 ref 설정
  const [boardId, setBoardId] = useState(); // 수정 post보낼 board id
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    category: '',
    tags: [],
    images: [],
  });

  const [photoUrl, setPhotoUrl] = useState(); // S3에서 가져온 URL정보
  const [images, setImages] = useState([]); // URL정보 보관
  const [tags, setTags] = useState([]);

  // 유효성검사
  const [titleValid, setTitleValid] = useState(false);
  const [contentValid, setContentValid] = useState(false);
  const [titleMessage, setTitleMessage] = useState('');
  const [contentMessage, setContentMessage] = useState('');

  // 입력값 저장 함수
  const onChange = event => {
    const InputName = event.target.name;
    const InputValue = event.target.value;
    const InputLength = InputValue.length;
    if (InputName === 'title') {
      if (InputLength < 5) {
        setTitleMessage('5글자 이상 입력하세요');
        setTitleValid(false);
      } else if (InputLength >= 5 && InputLength <= 40) {
        setTitleValid(true);
      } else {
        setTitleMessage('40글자 이하로 입력해주세요');
        setTitleValid(false);
      }
    }
    if (InputName === 'content')
      if (InputLength < 5) {
        setContentMessage('5글자 이상 입력하세요');
        setContentValid(false);
      } else setContentValid(true);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // 사진정보 formData에 담아주기
  useEffect(() => {
    if (photoUrl) {
      setImages([...images, photoUrl]);
      setFormData({ ...formData, images: [...images, photoUrl] });
    }
    return () => {};
  }, [photoUrl]);

  // formData에서 images상태에 저장된 URL 삭제하는 함수
  const deleteImages = index => {
    setImages(prev => {
      const prevData = [...prev];
      prevData.splice(index, 1);
      return prevData;
    });
  };

  useEffect(() => {
    setFormData(prev => {
      return { ...prev, images: [...images] };
    });
  }, [images]);

  // 상세 페이지에서 수정 클릭시 정보 받아오기
  useEffect(() => {
    if (!isPublishPage) {
      const data = loc.post;
      setFormData({
        title: data.title,
        content: data.content,
        location: data.location,
        category: data.category,
        tags: [...data.tags],
      });
      setImages([...data.photos]);
      setTags([...data.tags]);
      setBoardId(data.boardId);
      ref.current.preview([...data.photos]); // 장착시 미리보기 실행 코드
    }
    return () => {
      window.location.reload();
    };
  }, [loc]);

  const mandatory =
    images.length !== 0 &&
    formData.title.length >= 5 &&
    formData.title.length <= 40 &&
    formData.content.length >= 5 &&
    formData.category !== undefined;

  return (
    <Container>
      <h1>{isPublishPage ? '새 게시물' : '내 글 수정'}</h1>
      <PublishPhoto
        setPhotoUrl={setPhotoUrl}
        deleteImages={deleteImages}
        ref={ref}
      />
      <TitleContainer>
        <div className="title__label">
          <label htmlFor="title">제목</label>
        </div>
        <input
          className="title__input"
          type="text"
          id="title"
          name="title"
          defaultValue={isPublishPage ? null : loc.post.title}
          maxLength="40"
          onChange={event => {
            onChange(event);
          }}
          placeholder="제목을 입력하세요"
          required
        />
        <span className="validation__message">
          {titleValid ? null : titleMessage}
        </span>
      </TitleContainer>
      <ContentContainer>
        <div className="content__label">
          <label htmlFor="content">스토리 공유</label>
        </div>
        <textarea
          className="content__textarea"
          type="text"
          id="content"
          name="content"
          defaultValue={isPublishPage ? null : loc.post.content}
          rows="7"
          onChange={event => {
            onChange(event);
          }}
          placeholder="이야기를 공유해주세요"
          required
        />
        <span className="validation__message">
          {contentValid ? null : contentMessage}
        </span>
      </ContentContainer>
      <PublishLocCat
        isPublishPage={isPublishPage}
        loc={loc}
        onChange={onChange}
        formData={formData}
        setFormData={setFormData}
      />
      <PublishTags
        formData={formData}
        setFormData={setFormData}
        tags={tags}
        setTags={setTags}
      />
      <PublishModalButton
        boardId={boardId}
        mandatory={mandatory}
        formData={formData}
        isPublishPage={isPublishPage}
      />
    </Container>
  );
}

export default PublishForm;

// 전체 컨테이너
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
  .validation__message {
    color: red;
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

// 제목 - 입력(필수)
const TitleContainer = styled.section`
  > .title__label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
