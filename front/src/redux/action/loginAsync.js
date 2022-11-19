import { createAsyncThunk } from '@reduxjs/toolkit';
import loginApi from '../../api/loginApi';

const loginAsync = createAsyncThunk(
  'login/loginAsync',
  async (data, { rejectWithValue }) => {
    try {
      const loginData = await loginApi(data);
      return loginData;
    } catch (err) {
      // rejectWithValue 함수에 err를 담지 않으면 에러 데이터가 직렬화되지 못함.
      return rejectWithValue(err);
    }
  },
);

export default loginAsync;
