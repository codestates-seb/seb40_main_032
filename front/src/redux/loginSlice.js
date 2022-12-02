import { createSlice } from '@reduxjs/toolkit';
import loginAsync from './action/loginAsync';

const accessToken = localStorage.getItem('accessToken');
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: !!accessToken,
    accessToken,
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
    [loginAsync.pending]: () => {},
    [loginAsync.fulfilled]: (state, action) => {
      state.isLogin = true;
      localStorage.setItem('accessToken', action.payload.headers.authorization);
    },
    [loginAsync.rejected]: () => {},
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
