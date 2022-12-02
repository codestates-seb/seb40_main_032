import axios from 'axios';

const hookAxios = async url => {
  const data = await axios.get(url);

  return data;
};

export default hookAxios;
