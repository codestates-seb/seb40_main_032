import axios from 'axios';
import { getCookie } from '../util/cookie';

const deleteUserApi = () => {
  const jwt = getCookie('accessToken');

  return axios.delete('/accounts', {
    headers: { baseURL: '/', Authorization: jwt },
  });
};

export default deleteUserApi;
