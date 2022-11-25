import axios from 'axios';
import { getCookie } from '../util/cookie';

const accountId = getCookie('accountId');

const userDataApi = async () => {
  const userData = await axios.get(`/accounts/${accountId}`);

  return userData;
};

export default userDataApi;
