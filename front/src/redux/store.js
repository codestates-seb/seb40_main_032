import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import loginModalSlice from './loginModalSlice';
import searchSlice from './searchSlice';

const reducer = {
  search: searchSlice,
  login: loginSlice,
  loginModal: loginModalSlice,
};

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
