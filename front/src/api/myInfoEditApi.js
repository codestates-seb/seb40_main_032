import axios from 'axios';
import { getCookie } from '../util/cookie';

const myInfoEditApi = formData => {
  const jwt = getCookie('accessToken');

  return axios.post('/accounts/modify', JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
};

export default myInfoEditApi;
