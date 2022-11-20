import { useState } from 'react';

const useInput = init => {
  const [value, setValue] = useState(init);

  const changeValue = e => {
    setValue(e.target.value);
  };

  const resetValue = reset => {
    setValue(reset);
  };

  return [value, changeValue, resetValue];
};

export default useInput;
