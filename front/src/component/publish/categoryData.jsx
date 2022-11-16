import uuid from 'react-uuid';

const categoryData = [
  {
    id: uuid(),
    value: '맛집',
    theme: {
      background: 'var(--button-theme)',
      color: 'var(--base-white-color)',
    },
  },
  {
    id: uuid(),
    value: '숙소',
    theme: {
      background: 'var(--font-tag-color)',
      color: 'var(--base-white-color)',
    },
  },
  {
    id: uuid(),
    value: '여행지',
    theme: {
      background: 'var(--font-base-black)',
      color: 'var(--base-white-color)',
    },
  },
];

export default categoryData;
