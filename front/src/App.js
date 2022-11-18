import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Loading from './component/common/Loading';
import Header from './component/common/header/Header';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const PublishPage = React.lazy(() => import('./pages/PublishPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header />
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
