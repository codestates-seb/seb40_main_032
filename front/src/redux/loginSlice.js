import { createSlice } from '@reduxjs/toolkit';
import loginAsync from '../action/loginAsync';
import { getCookie } from '../util/cookie';

const accessToken = getCookie('accessToken');
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: !!accessToken,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
      console.log(state, action);
    },
    [loginAsync.fulfilled]: (state, action) => {
      console.log(state, action);
    },
    [loginAsync.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
