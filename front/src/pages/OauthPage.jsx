import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';
import loginUserApi from '../api/loginUserApi';

function OauthPage() {
  const dispatch = useDispatch();
  const oauthLogin = async () => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('jwt');
    localStorage.setItem('accessToken', `Bearer ${accessToken}`);
    await loginUserApi()
      .then(() => {
        dispatch(loginActions.login(true));
      })
      .catch(err => alert('로그인 실패', console.log(err)));
    window.location.replace('/');
  };
  useEffect(() => {
    oauthLogin();
  }, [oauthLogin]);

  return <div>인증중입니다.</div>;
}

export default OauthPage;
