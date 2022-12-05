import React, { useEffect } from 'react';
import loginUserApi from '../api/loginUserApi';

function OauthPage() {
  useEffect(async () => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('jwt');
    localStorage.setItem('accessToken', `Bearer ${accessToken}`);
    await loginUserApi()
      .then(res => console.log(res))
      .catch(err => console.log(err));
    window.location.replace('/');
    console.log(url, accessToken);
  }, []);
  return <div>인증중입니다.</div>;
}

export default OauthPage;
