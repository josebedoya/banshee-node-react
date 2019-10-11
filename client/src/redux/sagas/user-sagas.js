import { call, put, takeLatest } from 'redux-saga/effects';

import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  AUTH_ERROR
} from './../actions/auth-actions';

import { SET_ALERT } from './../actions/alert-actions';

import { urlAuth } from './../../api/api-urls';
import { apiGetLoggedUser } from './../../api/api-methods';

function* loadUserFlow(action) {
  const { token } = action;
  const { response: user } = yield call(() => apiGetLoggedUser(urlAuth, token));
  if (user) {
    // add user info to redux store
    yield put({ type: LOAD_USER_SUCCESS, payload: user });
  } else {
    yield put({ type: AUTH_ERROR });
    let alert = {
      alertType: 'error',
      title: 'Login error',
      message: 'Invalid login credentials. Try again.'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* userSagaWatcher() {
  yield takeLatest(LOAD_USER_REQUEST, loadUserFlow);
}

export default userSagaWatcher;
