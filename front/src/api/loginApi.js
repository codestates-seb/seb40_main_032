import axios from 'axios';

const loginApi = data => {
  return axios.post('/login', data);
};

export default loginApi;
