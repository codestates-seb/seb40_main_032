import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Loading from './component/common/Loading';
import Header from './component/common/header/Header';
import LoginModal from './component/common/modal/LoginModal';
import SignupModal from './component/common/modal/SignupModal';
import FindPasswordModal from './component/common/modal/FindPasswordModal';
import 'react-toastify/dist/ReactToastify.css';
import MyPage from './pages/myPages/MyPage';
import RestaurantPage from './pages/mainPages/RestaurantPage';
import StayPage from './pages/mainPages/StayPage';
import SpotPage from './pages/mainPages/SpotPage';
import AllThemePage from './pages/mainPages/AllThemePage';
import OauthPage from './pages/OauthPage';
import MyPost from './pages/myPages/MyPost';
import MyLikes from './pages/myPages/MyLikes';
import MyFollower from './pages/myPages/MyFollower';
import MyFollowing from './pages/myPages/MyFollowing';
import MainPage from './pages/mainPages/MainPage';
import MyInfoEdit from './pages/myPages/MyInfoEdit';
import PageTracking from './util/PageGaTracking';
import NotFound from './pages/NotFound';
import MetaTag from './util/MetaTag';
import TopButton from './component/common/button/TopButton';

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
  const passwordModalOpened = useSelector(
    state => state.loginModal.passwordModalOpened,
  );

  return (
    <Suspense fallback={<Loading />}>
      <MetaTag
        title="여행 공유의 즐거움을 느끼다 Tripagram"
        keywords="여행, 사진, 소셜미디어, 공유, Travel, Photo, Social Media, Share"
        description="여행에서 느꼈던 감정 사진들을 다른 사람들과 공유하며 소통하는 공간입니다"
      />
      <ToastContainer />
      {loginModalOpened && <LoginModal />}
      {signupModalOpened && <SignupModal />}
      {passwordModalOpened && <FindPasswordModal />}
      <Header />
      <TopButton />
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
          <Route path="myinfoedit/:accountId" element={<MyInfoEdit />} />
        </Route>
        <Route path="/oauth" element={<OauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
