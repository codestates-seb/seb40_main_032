import { useEffect, useState } from 'react';
import hookeAxios from '../api/hookApi';

const useAxios = url => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    hookeAxios(url)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
      });
  }, [url]);

  return [data, loading, error];
};

export default useAxios;
