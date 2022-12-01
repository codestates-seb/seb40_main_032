import { createSlice } from '@reduxjs/toolkit';

const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState: {
    loginModalOpened: false,
    signupModalOpened: false,
    passwordModalOpened: false,
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
    openFindPasswordModal(state) {
      state.passwordModalOpened = true;
    },
    closeFindPasswordModal(state) {
      state.passwordModalOpened = false;
    },
  },
});

export const loginModalActions = loginModalSlice.actions;

export default loginModalSlice.reducer;
