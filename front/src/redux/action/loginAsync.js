import { createAsyncThunk } from '@reduxjs/toolkit';
import loginApi from '../../api/loginApi';

const loginAsync = createAsyncThunk(
  'login/loginAsync',
  async (data, { rejectWithValue }) => {
    try {
      const loginData = await loginApi(data);
      return loginData;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export default loginAsync;
