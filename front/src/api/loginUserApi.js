import axios from 'axios';

const loginUserApi = jwt => {
  return axios.get('/accounts/login', {
    headers: {
      Authorization: jwt,
    },
  });
};

export default loginUserApi;
