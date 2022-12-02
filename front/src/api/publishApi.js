import axios from 'axios';

const publishApi = formData => {
  const jwt = localStorage.getItem('accessToken');

  return axios.post('/boards', JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
};

export default publishApi;
