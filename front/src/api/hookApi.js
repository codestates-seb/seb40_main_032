import axios from 'axios';

const hookeAxios = async url => {
  const data = await axios.get(url);

  return data;
};

export default hookeAxios;
