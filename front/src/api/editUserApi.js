import axios from 'axios';

const editUserApi = formData => {
  const jwt = localStorage.getItem('accessToken');

  return axios.post('/accounts/modify', JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
};

export default editUserApi;
