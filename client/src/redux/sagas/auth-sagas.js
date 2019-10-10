import { call, put, takeLatest } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  LOAD_USER2,
  AUTH_ERROR
} from './../actions/auth-actions';

import { SET_ALERT } from './../actions/alert-actions';

import { urlAuth } from './../../api/api-urls';
import { apiPost, apiGetLoggedUser } from './../../api/api-methods';

function* loginFlow(action) {
  const { email, password } = action.user;
  const obj = {
    email: email,
    password: password
  };
  const { response } = yield call(() => apiPost(urlAuth, obj));
  if (response) {
    const { token } = response;
    // inform redux that our login was successful
    yield put({ type: LOGIN_SUCCESS, payload: token });

    // get logged user info
    // yield put(loadUser(token));
    const { response: user } = yield call(() =>
      apiGetLoggedUser(urlAuth, token)
    );
    // add user info to redux store
    yield put({ type: LOAD_USER, payload: user });

    let alert = {
      alertType: 'success',
      title: '¡Welcome to Banshee!',
      message: 'Login successfully'
    };
    yield put({ type: SET_ALERT, payload: alert });
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

function* loadUserFlow(action) {
  const { token } = action;
  const { response: user } = yield call(() => apiGetLoggedUser(urlAuth, token));
  if (user) {
    // add user info to redux store
    yield put({ type: LOAD_USER, payload: user });
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

function* authSagaWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginFlow);
  yield takeLatest(LOAD_USER2, loadUserFlow);
}

export default authSagaWatcher;
