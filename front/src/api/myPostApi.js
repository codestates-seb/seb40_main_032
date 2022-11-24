import axios from 'axios';

const accountId = localStorage.getItem('id');

const myPostApi = async () => {
  const myPost = await axios.get(`/boards/account/${accountId}`);
  return myPost.data;
};

export default myPostApi;
