import axios from 'axios';
import { getCookie } from '../util/cookie';

const publishApi = formData => {
  const jwt = getCookie('accessToken');

  return axios.post('/boards', formData, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Authorization: jwt,
    },
  });
};

export default publishApi;