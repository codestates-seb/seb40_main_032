import axios from 'axios';

const postPhotoApi = formData => {
  const jwt = localStorage.getItem('accessToken');

  return axios.post('/image-files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Authorization: jwt,
    },
  });
};

export default postPhotoApi;
