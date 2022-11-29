import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import MyInfoEdit from './pages/myPages/MyInfoEdit';
import PageTracking from './util/PageGaTracking';

const PublishPage = React.lazy(() => import('./pages/PublishPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));

function App() {
  PageTracking();
  const loginModalOpened = useSelector(
    state => state.loginModal.loginModalOpened,
  );
  const signupModalOpened = useSelector(
    state => state.loginModal.signupModalOpened,
  );

  return (
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
          <Route path="mypost/:accountId" element={<MyPost />} />
          <Route path="mylikes/:accountId" element={<MyLikes />} />
          <Route path="myfollower/:accountId" element={<MyFollower />} />
          <Route path="myfollowing/:accountId" element={<MyFollowing />} />
        </Route>
        <Route path="/myinfoedit" element={<MyInfoEdit />} />
      </Routes>
    </Suspense>
  );
}

export default App;
