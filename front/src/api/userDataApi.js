import axios from 'axios';

const userDataApi = async accountId => {
  const userData = await axios.get(`/accounts/${accountId}`);

  return userData;
};

export default userDataApi;
