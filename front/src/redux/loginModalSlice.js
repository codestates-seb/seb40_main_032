import { createSlice } from '@reduxjs/toolkit';

const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState: {
    loginModalOpened: false,
  },
  reducers: {
    openLoginModal(state) {
      state.loginModalOpened = true;
    },
    closeLoginModal(state) {
      state.loginModalOpened = false;
    },
  },
});

export const loginModalActions = loginModalSlice.actions;

export default loginModalSlice.reducer;
