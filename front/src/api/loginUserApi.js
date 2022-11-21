import axios from 'axios';
import { getCookie } from '../util/cookie';

const loginUserApi = async () => {
  const jwt = getCookie('accessToken');
  const login = await axios.get('/accounts/login', {
    headers: {
      Authorization: jwt,
    },
  });
  if (!localStorage.getItem('id') && !localStorage.getItem('profile')) {
    localStorage.setItem('id', login.data.id);
    localStorage.setItem('profile', login.data.profile);
  }
};

export default loginUserApi;
