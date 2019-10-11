import { all } from 'redux-saga/effects';

import AuthSaga from './auth-sagas';
import UserSaga from './user-sagas';
import AgentsSaga from './agents-sagas';
import ClientsSaga from './clients-sagas';
import VisitsSaga from './visits-sagas';

export default function* Sagas() {
  yield all([
    AuthSaga(),
    UserSaga(),
    AgentsSaga(),
    ClientsSaga(),
    VisitsSaga()
  ]);
}
