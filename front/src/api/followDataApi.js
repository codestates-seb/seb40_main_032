import axios from 'axios';
import { getCookie } from '../util/cookie';

const jwt = getCookie('accessToken');
const followDataApi = async (accountId, page, status) => {
  const followData = await axios.get(
    `/accounts/follow/${accountId}?page=${page}&size=5&sort=createdAt%2Cdesc&status=${status}`,
    {
      headers: {
        Authorization: jwt,
      },
    },
  );

  return followData;
};

export default followDataApi;
