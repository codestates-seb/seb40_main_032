import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import categoryData from './categoryData';
import { DefaultButton, TransparentButton } from '../common/button/ButtonStyle';
import PublishPhoto from './PublishPhoto';
import ConfirmModal from '../common/modal/ConfirmModal';
import YesNoModal from '../common/modal/YesNoModal';
import publishPostApi from '../../api/publishPostApi';
import { loginModalActions } from '../../redux/loginModalSlice';

function PublishForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationEdit = useLocation();
  const login = useSelector(state => state.login.isLogin);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    category: '',
    tags: [],
    isValid: true,
  });

  const [categorySelected, setCategorySelected] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState();

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [yesNoModalOpened, setYesNoModalOpened] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const { title, content, location } = formData;

  // 입력값 저장 함수
  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  // 테마 선택 함수
  const onClick = index => {
    setCategorySelected(index);
    const { category } = categoryData[index];
    setFormData({ ...formData, category });
  };

  // 해쉬태그 추가
  const handleTagAdd = async event => {
    const { value } = event.target;
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const filtered = tags.filter(el => el === value);

    if (event.key === 'Enter' || event.key === ',') {
      if (!regex.test(value)) return;
      if (regex.test(value) && value !== '' && filtered.indexOf(value) === -1) {
        setTags([...tags, value]);
        setFormData({ ...formData, tags: [...tags, value] });
        setTimeout(() => {
          setNewTag('');
        }, 0);
      }
    }
  };

  // 해쉬태그 삭제
  const handleTagRemove = indexRemove => {
    setTags([...tags.filter((_, index) => index !== indexRemove)]);
  };

  // 게시글 등록 요청
  const publishRequest = async () => {
    publishPostApi(formData)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          setPublishSuccess(true);
          navigate('/');
        }
      })
      .catch(error => console.log(error.response.data.message));
  };

  // 등록 버튼 모달 연결
  const confirmModalOpener = event => {
    event.preventDefault();
    publishRequest();
    if (publishSuccess) setConfirmModalOpened(true);
  };

  const confirmModalCloser = () => {
    setConfirmModalOpened(false);
    navigate(-1);
  };

  // 취소 버튼 모달 연결
  const yesNoModalOpener = event => {
    event.preventDefault();
    setYesNoModalOpened(true);
  };

  const yesNoModalActioner = () => {
    navigate(-1);
  };

  const yesNoModalCloser = () => {
    setYesNoModalOpened(false);
  };

  const loginModalOpener = () => {
    dispatch(loginModalActions.openLoginModal());
  };

  // 등록 버튼 타이머 설정
  useEffect(() => {
    let timer;
    if (confirmModalOpened) {
      timer = setTimeout(() => {
        confirmModalCloser();
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [confirmModalOpened]);

  // (비로그인) url입력 접근시 로그인창으로 redirect
  useEffect(() => {
    if (!login) {
      alert('로그인 해주세요');
      navigate('/main');
      loginModalOpener();
    }
    return () => {};
  }, []);

  // 상세 페이지에서 수정 클릭시 정보 받아올 준비
  useEffect(() => {
    console.log(locationEdit);
  }, [locationEdit]);

  return (
    <Container>
      <h1>
        새 게시물
        <button
          onClick={() => {
            console.log(formData);
          }}
        >
          123213
        </button>
      </h1>
      <PublishPhoto />
      <TitleContainer>
        <div className="title__label">
          <label htmlFor="title">제목</label>
        </div>
        <input
          className="title__input"
          type="text"
          id="title"
          name="title"
          value={title || ''}
          maxLength="40"
          onChange={event => {
            onChange(event);
          }}
          placeholder="제목을 입력하세요"
          required
        />
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
          value={content || ''}
          rows="7"
          onChange={event => {
            onChange(event);
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
            onChange={event => onChange(event)}
            maxLength="20"
            placeholder="위치를 남겨주세요"
          />
        </LocationContainer>
        <CategoryContainer>
          <label htmlFor="category">테마</label>
          <div id="categories">
            {categoryData.map((item, index) => {
              return (
                <Category
                  theme={item.theme}
                  onClick={() => {
                    onClick(index);
                  }}
                  className={
                    categorySelected === index ? 'categorySelected' : null
                  }
                  key={item.id}
                >
                  {item.text}
                </Category>
              );
            })}
          </div>
        </CategoryContainer>
      </LocationCategoryRow>
      <TagContainer>
        <label htmlFor="tag">태그</label>
        <ul className="tag__wrapper">
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
        </ul>
      </TagContainer>
      <ButtonContainer>
        <PublishButton
          width="8vw"
          height="4vh"
          fontSize="var(--font-15)"
          fontWeight="var(--font-bold)"
          onClick={confirmModalOpener}
        >
          <span>등록</span>
        </PublishButton>
        <CancelButton
          width="8vw"
          fontSize="var(—font-15)"
          fontWeight="var(—font-bold)"
          onClick={yesNoModalOpener}
        >
          <span>취소</span>
        </CancelButton>
      </ButtonContainer>
      <>
        {confirmModalOpened ? (
          <ConfirmModal
            modalMessage="게시글 등록이 완료되었습니다."
            modalCloser={confirmModalCloser}
          />
        ) : null}
        {yesNoModalOpened ? (
          <YesNoModal
            modalMessage="게시글 작성을 취소할까요?"
            modalActioner={yesNoModalActioner}
            modalCloser={yesNoModalCloser}
          />
        ) : null}
      </>
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

// 위치 & 테마 열
const LocationCategoryRow = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  @media screen and (max-width: 549px) {
    flex-direction: column;
  }
`;

// 위치 - 입력(선택)
const LocationContainer = styled.div`
  width: 100%;
`;

// 테마 - 선택(필수:택1)
const CategoryContainer = styled.div`
  width: 100%;
  #categories {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid var(--holder-base-color);
    border-radius: var(--radius-10);
    padding: 0.5rem;
  }
  @media screen and (max-width: 549px) {
    width: 70%;
  }
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
  &.categorySelected {
    opacity: 1;
    font-weight: var(--font-bold);
    transition: 0.2s all ease-in-out;
    box-shadow: var(--bx-sh-two);
  }
`;

// 태그 - 입력, 삭제
const TagContainer = styled.section`
  width: auto;
  .tag__wrapper {
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
    .tag__input--create {
      border: none;
      flex: 1;
      margin-top: 0;
    }
  }
`;

// 버튼 - 등록, 취소
const ButtonContainer = styled.form`
  display: flex;
  justify-content: start;
`;

// 등록 버튼 스타일링
const PublishButton = styled(DefaultButton)`
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

// 취소 버튼 스타일링
const CancelButton = styled(TransparentButton)`
  &:hover {
    color: red;
    transition: 0.1s ease-in-out;
  }
  @media screen and (max-width: 549px) {
    width: 28vw;
    height: 4vh;
  }
`;
