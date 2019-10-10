import { all } from 'redux-saga/effects';

import AuthSaga from './auth-sagas';
import AgentsSaga from './agents-sagas';

export default function* Sagas() {
  yield all([AuthSaga(), AgentsSaga()]);
}
