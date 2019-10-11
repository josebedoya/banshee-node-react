import { call, put, takeLatest } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  loadUserRequest
} from './../actions/auth-actions';

import { SET_ALERT } from './../actions/alert-actions';

import { urlAuth } from './../../api/api-urls';
import { apiPost } from './../../api/api-methods';

function* loginFlow(action) {
  const { email, password } = action.user;
  const obj = {
    email: email,
    password: password
  };
  const { response } = yield call(() => apiPost(urlAuth, obj));
  if (response) {
    const { token } = response;

    let alert = {
      alertType: 'success',
      title: '¡Welcome to Banshee!',
      message: 'Login successfully'
    };

    yield put({ type: SET_ALERT, payload: alert });

    // inform redux that our login was successful
    yield put({ type: LOGIN_SUCCESS, payload: token });

    // get logged user info
    yield put(loadUserRequest(token));
  } else {
    yield put({ type: LOGIN_ERROR });
    let alert = {
      alertType: 'error',
      title: 'Login error',
      message: 'Invalid login credentials. Try again.'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* authSagaWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginFlow);
}

export default authSagaWatcher;
