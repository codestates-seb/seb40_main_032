import { createAsyncThunk } from '@reduxjs/toolkit';
import loginApi from '../../api/loginApi';

const loginAsync = createAsyncThunk('login/loginAsync', async data => {
  const loginData = await loginApi(data);

  return loginData;
});

export default loginAsync;
