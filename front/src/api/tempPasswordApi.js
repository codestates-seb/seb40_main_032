import axios from 'axios';

const tempPasswordApi = async email => {
  const tempPassword = await axios.post('/accounts/tempPassword/email', {
    email,
  });

  return tempPassword;
};

export default tempPasswordApi;
