import { all, fork } from 'redux-saga/effects';
import userLoginWatcher from './loginSaga';

function* rootSaga() {
  yield all([fork(userLoginWatcher)]);
}

export default rootSaga;
