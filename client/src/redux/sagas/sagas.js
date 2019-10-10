import { all } from 'redux-saga/effects';

import AuthSaga from './auth-sagas';

export default function* Sagas() {
  yield all([AuthSaga()]);
}
