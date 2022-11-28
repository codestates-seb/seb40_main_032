import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { loginModalActions } from './redux/loginModalSlice';
import Loading from './component/common/Loading';
import Header from './component/common/header/Header';
import LoginModal from './component/common/modal/LoginModal';
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
import NotFound from './pages/NotFound';

const PublishPage = React.lazy(() => import('./pages/PublishPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));

function App() {
  const dispatch = useDispatch();
  const loginModalOpened = useSelector(
    state => state.loginModal.loginModalOpened,
  );

  // 로그인 모달 여닫는 함수
  // Slice로 관리함에 따른 Refactor
  // const loginModalOpener = () => {
  //   dispatch(loginModalActions.openLoginModal());
  // };
  const loginModalCloser = () => {
    dispatch(loginModalActions.closeLoginModal());
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
        <Header /> {/* loginModalOpener={loginModalOpener} */}
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
          <Route path="/myinfoedit" element={<MyInfoEdit />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
