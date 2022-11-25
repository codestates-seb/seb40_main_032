import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import categoryData from './categoryData';

function PublishLocCat({
  isPublishPage,
  loc,
  onChange,
  formData,
  setFormData,
}) {
  const [isSelected, setIsSelected] = useState('');
  const [displayText, setDisplayText] = useState(['']);

  // 테마 선택 함수
  const onClick = index => {
    setIsSelected(index);
    const { category } = categoryData[index];
    const { text } = categoryData[index];
    setDisplayText(text);
    setFormData({ ...formData, category });
  };

  // 수정창에서 선택한 테마 보여주기
  useEffect(() => {
    if (!isPublishPage)
      if (formData.category === 'CATEGORY')
        setDisplayText(categoryData[0].text);
      else if (formData.category === 'STAY')
        setDisplayText(categoryData[1].text);
      else setDisplayText(categoryData[2].text);
  }, []);

  return (
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
          defaultValue={isPublishPage ? null : loc.post.location}
          onChange={event => onChange(event)}
          maxLength="40"
          placeholder="위치를 남겨주세요"
        />
      </LocationContainer>
      <CategoryContainer>
        <label htmlFor="category">
          <span className="category__label">테마</span>
          <span className="category__text">{` - ${displayText}`}</span>
        </label>
        <div id="categories">
          {categoryData.map((item, index) => {
            return (
              <Category
                theme={item.theme}
                onClick={() => {
                  onClick(index);
                }}
                className={isSelected === index ? 'isSelected' : null}
                key={item.id}
              >
                {item.text}
              </Category>
            );
          })}
        </div>
      </CategoryContainer>
    </LocationCategoryRow>
  );
}

export default PublishLocCat;

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
  .category__text {
    font-size: var(--font-15);
  }
  @media screen and (max-width: 549px) {
    width: 70%;
  }
`;

const Category = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  text-align: center;
  width: 31%;
  border: none;
  border-radius: var(--radius-10);
  font-weight: var(--font-semi-bold);
  font-size: 15px;
  opacity: 0.7;
  padding: 0.5rem;
  cursor: pointer;
  &:hover,
  &.isSelected {
    opacity: 1;
    font-weight: var(--font-bold);
    transition: 0.2s all ease-in-out;
    box-shadow: var(--bx-sh-four);
  }
  @media screen and (max-width: 549px) {
    font-size: 10px;
  }
`;
