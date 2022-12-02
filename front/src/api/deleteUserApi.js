import axios from 'axios';

const deleteUserApi = () => {
  const jwt = localStorage.getItem('accessToken');

  return axios.delete('/accounts', {
    headers: { baseURL: '/', Authorization: jwt },
  });
};

export default deleteUserApi;
