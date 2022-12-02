import axios from 'axios';

const postEditApi = (boardId, formData) => {
  const jwt = localStorage.getItem('accessToken');

  return axios.post(`/boards/${boardId}`, JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
};

export default postEditApi;
