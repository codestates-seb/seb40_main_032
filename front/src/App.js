import './App.css';
import React, { useState, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Loading from './component/common/Loading';
import Header from './component/common/header/Header';
import LoginModal from './component/common/modal/LoginModal';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const PublishPage = React.lazy(() => import('./pages/PublishPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));

function App() {
  const [loginModalOpened, setLoginModalOpened] = useState(false);

  const loginModalOpener = () => {
    setLoginModalOpened(true);
  };

  const loginModalCloser = () => {
    setLoginModalOpened(false);
  };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        {loginModalOpened && <LoginModal modalCloser={loginModalCloser} />}
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
