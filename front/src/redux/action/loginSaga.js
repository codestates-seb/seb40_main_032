import { takeEvery, call, put, fork } from 'redux-saga/effects';
import { loginActions } from '../loginSlice';
import loginApi from '../../api/loginApi';
import loginUserApi from '../../api/loginUserApi';
import { loginModalActions } from '../loginModalSlice';

function* userLoginApiSaga() {
  const jwt = yield localStorage.getItem('accessToken');
  const accountId = yield localStorage.getItem('accountId');
  const profile = yield localStorage.getItem('profile');
  const login = yield call(loginUserApi, jwt);

  if (!accountId && !profile) {
    yield localStorage.setItem('accountId', login.data.id);
    yield localStorage.setItem('profile', login.data.profile);
  }
  yield put(loginModalActions.closeLoginModal());
  yield window.location.reload();
}

function* userLoginSaga(action) {
  try {
    const loginDetail = yield call(loginApi, action.payload);
    yield put(loginActions.login(loginDetail));
    yield fork(userLoginApiSaga);
  } catch (error) {
    yield put(loginActions.loginFail());
  }
}
export default function* userLoginWatcher() {
  yield takeEvery(loginActions.loginWatcher, userLoginSaga);
}
