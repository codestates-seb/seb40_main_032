import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

// 여기에 slice 작성하시면 됩니다.
const reducer = {
  login: loginSlice,
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
