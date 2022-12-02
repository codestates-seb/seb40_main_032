import axios from 'axios';

const loginUserApi = async () => {
  const jwt = localStorage.getItem('accessToken');
  const accountId = localStorage.getItem('accountId');
  const profile = localStorage.getItem('profile');
  const login = await axios.get('/accounts/login', {
    headers: {
      Authorization: jwt,
    },
  });

  if (!accountId && !profile) {
    localStorage.setItem('accountId', login.data.id, {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
    localStorage.setItem('profile', login.data.profile, {
      path: '/',
      sameSite: 'None',
      secure: 'false',
    });
  }
  return login;
};

export default loginUserApi;
