import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

// 여기에 slice 작성하시면 됩니다.
const reducer = {
  login: loginSlice,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
