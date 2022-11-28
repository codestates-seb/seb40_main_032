import { createSlice } from '@reduxjs/toolkit';

const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState: {
    loginModalOpened: false,
    signupModalOpened: false,
  },
  reducers: {
    openLoginModal(state) {
      state.loginModalOpened = true;
    },
    closeLoginModal(state) {
      state.loginModalOpened = false;
    },
    openSignupModal(state) {
      state.signupModalOpened = true;
    },
    closeSignupModal(state) {
      state.signupModalOpened = false;
    },
  },
});

export const loginModalActions = loginModalSlice.actions;

export default loginModalSlice.reducer;
