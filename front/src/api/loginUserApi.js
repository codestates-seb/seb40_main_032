import axios from 'axios';
import { getCookie, setCookie } from '../util/cookie';

const loginUserApi = async () => {
  const jwt = getCookie('accessToken');
  const accountId = getCookie('accountId');
  const profile = getCookie('profile');
  const login = await axios.get('/accounts/login', {
    headers: {
      Authorization: jwt,
    },
  });

  if (!accountId && !profile) {
    setCookie('accountId', login.data.id, {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
    setCookie('profile', login.data.profile, {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
  }
  return login;
};

export default loginUserApi;
