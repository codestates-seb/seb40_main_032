import { createSlice } from '@reduxjs/toolkit';
import loginAsync from '../action/loginAsync';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  },
  reducers: {},
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
