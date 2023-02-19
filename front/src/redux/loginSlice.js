import { createSlice } from '@reduxjs/toolkit';

const accessToken = localStorage.getItem('accessToken');
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: !!accessToken,
    accessToken,
    isLoading: false,
    loginError: false,
  },
  reducers: {
    loginWatcher(state) {
      state.isLoading = true;
    },
    login(state, action) {
      state.isLogin = true;
      localStorage.setItem('accessToken', action.payload.headers.authorization);
      state.isLoading = false;
      state.loginError = false;
    },
    loginFail(state) {
      state.isLoading = false;
      state.loginError = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
