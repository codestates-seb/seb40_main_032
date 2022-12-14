import React, { useState } from 'react';
import styled from 'styled-components';

function PublishTags({ formData, setFormData, tags, setTags }) {
  const [newTag, setNewTag] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const handleTagAdd = event => {
    if (event.key === 'Enter' || event.key === ',') {
      const { value } = event.target;
      const filtered = tags.filter(el => el === value);

      if (value === '') {
        setMessage('빈 태그는 입력할 수 없습니다.');
        setError(true);
      }
      if (filtered.length !== 0) {
        setMessage('중복된 태그는 입력할 수 없습니다.');
        setError(true);
      }
      if (value !== '' && filtered.length === 0 && value.length <= 6) {
        setTags([...tags, value]);
        setFormData({ ...formData, tags: [...tags, value] });
        setTimeout(() => {
          setNewTag('');
          setError(false);
        }, 0);
      }
    }
  };

  const handleTagRemove = indexRemove => {
    setTags(prev => {
      const filtered = [...prev.filter((_, index) => index !== indexRemove)];
      setFormData({ ...formData, tags: [...filtered] });
      return filtered;
    });
  };

  return (
    <TagContainer>
      <label htmlFor="tag">태그</label>
      <ul className="tag__wrapper">
        {tags.map((tag, index) => (
          <li className="tag" key={tag}>
            <span className="tag__name">#{tag}</span>
            <button onClick={() => handleTagRemove(index)}>❌</button>
          </li>
        ))}
        {tags.length === 5 ? null : (
          <input
            className="tag__input--create"
            id="tag"
            type="text"
            value={newTag || ''}
            maxLength="6"
            onChange={event => setNewTag(event.target.value)}
            onKeyDown={event => handleTagAdd(event)}
            placeholder="태그를 입력하세요 (최대 5개)"
          />
        )}
      </ul>
      {error ? <ErrorMessage>{message}</ErrorMessage> : null}
    </TagContainer>
  );
}

export default PublishTags;

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
      height: 3.5rem;
      align-items: center;
      white-space: nowrap;
      margin: 0 0.5rem 0 1rem;
      border-radius: var(--radius-10);
      color: var(--font-base-black);
      font-size: 1.3rem;
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
      margin-top: 0px;
      width: 12.3rem;
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
`;
