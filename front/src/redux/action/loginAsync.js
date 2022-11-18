import { createAsyncThunk } from '@reduxjs/toolkit';
import loginApi from '../../api/loginApi';

const loginAsync = createAsyncThunk(
  'login/loginAsync',
  async ({ url, data }) => {
    const loginData = loginApi(url, data);

    return loginData;
  },
);
export default loginAsync;
