import axios from 'axios';

const jwt = localStorage.getItem('accessToken');
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
