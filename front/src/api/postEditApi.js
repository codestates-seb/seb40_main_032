import axios from 'axios';
import { getCookie } from '../util/cookie';

const postEditApi = (boardId, formData) => {
  const jwt = getCookie('accessToken');

  return axios.post(`/boards/${boardId}`, JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
};

export default postEditApi;
