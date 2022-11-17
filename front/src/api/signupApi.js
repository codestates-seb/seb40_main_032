import axios from 'axios';

const signupApi = data => {
  return axios('/accounts', {
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data,
  });
};

export default signupApi;
