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
      // state.accessToken = action.payload.headers.authorization;
      // 쿠키의 domain 옵션은 로컬호스트나 ip주소같은 url에선 작동하지 않음.
      // chrome 정책에 의해 .com과 같은 일반적인 도메인 주소에서만 사용 가능.
      // httpOnly 옵션을 설정할 경우 클라이언트측에서 쿠키를 저장, 사용할 수 없음.
      // sameSite 옵션은 서버와 클라이언트의 주소가 다르므로 None으로 설정했음.
      localStorage.setItem('accessToken', action.payload.headers.authorization);
    },
    [loginAsync.rejected]: () => {},
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
