import axios from 'axios';

const accountId = localStorage.getItem('id');

const myPostApi = async (quantity, page) => {
  const myPost = await axios.get(
    `/boards/account/${accountId}?&size=${quantity}&page=${page.current}`,
  );
  return myPost.data;
};

export default myPostApi;
