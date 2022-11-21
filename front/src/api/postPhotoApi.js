import axios from 'axios';
import { getCookie } from '../util/cookie';

const postPhotoApi = formData => {
  const jwt = getCookie('accessToken');

  return axios.post('image-files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Authorization: jwt,
    },
  });
};

export default postPhotoApi;
