import uuid from 'react-uuid';

const categoryData = [
  {
    id: uuid(),
    category: 'RESTAURANT',
    text: '맛집',
    theme: {
      background: 'var(--button-theme)',
      color: 'var(--base-white-color)',
    },
  },
  {
    id: uuid(),
    category: 'STAY',
    text: '숙소',
    theme: {
      background: 'var(--font-tag-color)',
      color: 'var(--base-white-color)',
    },
  },
  {
    id: uuid(),
    category: 'SPOT',
    text: '여행지',
    theme: {
      background: 'var(--font-base-black)',
      color: 'var(--base-white-color)',
    },
  },
];

export default categoryData;
