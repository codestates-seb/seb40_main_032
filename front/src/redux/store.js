import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import loginModalSlice from './loginModalSlice';
import searchSlice from './searchSlice';

// 여기에 slice 작성하시면 됩니다.
const reducer = {
  search: searchSlice,
  login: loginSlice,
  loginModal: loginModalSlice,
};

const store = configureStore({
  reducer,
  // 직렬화 오류를 무시하기 위한 미들웨어
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
