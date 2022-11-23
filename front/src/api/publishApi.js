import axios from 'axios';
import { getCookie } from '../util/cookie';

const publishApi = formData => {
  const jwt = getCookie('accessToken');

  return axios.post('/boards', JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
};

export default publishApi;
