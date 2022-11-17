import axios from 'axios';
// 초기 세팅입니다. url data 전부 변경하시면 됩니다.
const loginApi = (url, data) => {
  return axios
    .post(url, data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export default loginApi;
