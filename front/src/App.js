import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Loading from './component/common/Loading';
import Header from './component/common/header/Header';
import LoginModal from './component/common/modal/LoginModal';
import SignupModal from './component/common/modal/SignupModal';
import 'react-toastify/dist/ReactToastify.css';
import MyPage from './pages/myPages/MyPage';
import RestaurantPage from './pages/mainPages/RestaurantPage';
import StayPage from './pages/mainPages/StayPage';
import SpotPage from './pages/mainPages/SpotPage';
import AllThemePage from './pages/mainPages/AllThemePage';
import MyPost from './pages/myPages/MyPost';
import MyLikes from './pages/myPages/MyLikes';
import MyFollower from './pages/myPages/MyFollower';
import MyFollowing from './pages/myPages/MyFollowing';
import MainPage from './pages/mainPages/MainPage';

const PublishPage = React.lazy(() => import('./pages/PublishPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));

function App() {
  const loginModalOpened = useSelector(
    state => state.loginModal.loginModalOpened,
  );
  const signupModalOpened = useSelector(
    state => state.loginModal.signupModalOpened,
  );

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        {loginModalOpened && <LoginModal />}
        {signupModalOpened && <SignupModal />}
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<AllThemePage />} />
            <Route path="restaurant" element={<RestaurantPage />} />
            <Route path="stay" element={<StayPage />} />
            <Route path="spot" element={<SpotPage />} />
          </Route>
          <Route path="/postDetail/:id" element={<PostDetailPage />} />
          <Route path="/publish" element={<PublishPage />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<MyPost />} />
            <Route path="mylikes" element={<MyLikes />} />
            <Route path="myfollower" element={<MyFollower />} />
            <Route path="myfollowing" element={<MyFollowing />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
