import './App.css';
import React, { useState, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './component/common/Loading';
import Header from './component/common/header/Header';
import LoginModal from './component/common/modal/LoginModal';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const PublishPage = React.lazy(() => import('./pages/PublishPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));

function App() {
  const [loginModalOpened, setLoginModalOpened] = useState(false);

  // 로그인 모달 여닫는 함수
  const loginModalOpener = () => {
    setLoginModalOpened(true);
  };
  const loginModalCloser = () => {
    setLoginModalOpened(false);
  };

  // 로그인 성공 시, toastify 함수
  const loginNotify = () =>
    toast('로그인 성공!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        {loginModalOpened && (
          <LoginModal
            modalCloser={loginModalCloser}
            loginNotify={loginNotify}
          />
        )}
        <Header loginModalOpener={loginModalOpener} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/postDetail/:id" element={<PostDetailPage />} />
          <Route path="/publish" element={<PublishPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
