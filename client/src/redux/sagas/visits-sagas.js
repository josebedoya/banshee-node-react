import { call, put, takeLatest } from 'redux-saga/effects';

import history from './../../history';

import {
  FETCH_VISITS,
  FETCH_VISITS_SUCCESS,
  FETCH_VISITS_ERROR,
  INSERT_VISIT,
  INSERT_VISIT_SUCCESS,
  INSERT_VISIT_ERROR,
  UPDATE_VISIT,
  UPDATE_VISIT_SUCCESS,
  UPDATE_VISIT_ERROR,
  DELETE_VISIT,
  DELETE_VISIT_SUCCESS,
  DELETE_VISIT_ERROR
} from './../actions/visits-actions';

import { SET_ALERT } from './../actions/alert-actions';

import { urlVisits } from './../../api/api-urls';
import { apiGet, apiPost, apiPut, apiDelete } from './../../api/api-methods';

function* fetchFlow() {
  const { response, error } = yield call(() => apiGet(`${urlVisits}`));
  if (response) {
    yield put({ type: FETCH_VISITS_SUCCESS, payload: response });
  } else {
    yield put({ type: FETCH_VISITS_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'List of visits',
      message: 'An error occurred while loading visits'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* insertFlow(action) {
  const { visit } = action;
  const newVisit = {
    agentId: visit.agentId,
    clientId: visit.clientId,
    net: visit.net,
    description: visit.description,
    visits_percentage: visit.visits_percentage
  };
  const { response, error } = yield call(() =>
    apiPost(`${urlVisits}`, newVisit)
  );
  if (response) {
    yield put({ type: INSERT_VISIT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Visit registered',
      message: 'Visit has been registered'
    };
    yield put({ type: SET_ALERT, payload: alert });
    history.push(`/app/visits-client/${visit.clientId}`);
  } else {
    yield put({ type: INSERT_VISIT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error registering visit',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* updateFlow(action) {
  const { id, visit } = action;
  const updVisit = {
    name: visit.name
  };
  const { response, error } = yield call(() => apiPut(urlVisits, id, updVisit));
  if (response) {
    yield put({ type: UPDATE_VISIT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Visit updated',
      message: 'Visit has been updated'
    };
    yield put({ type: SET_ALERT, payload: alert });
  } else {
    yield put({ type: UPDATE_VISIT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error updating VISIT',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* deleteFlow(action) {
  const { id } = action;
  const { response, error } = yield call(() => apiDelete(urlVisits, id));
  if (response) {
    yield put({ type: DELETE_VISIT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Visit deleted',
      message: 'Visit has been deleted'
    };
    yield put({ type: SET_ALERT, payload: alert });
  } else {
    yield put({ type: DELETE_VISIT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error deleting visit',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* visitsSagaWatcher() {
  yield takeLatest(FETCH_VISITS, fetchFlow);
  yield takeLatest(INSERT_VISIT, insertFlow);
  yield takeLatest(UPDATE_VISIT, updateFlow);
  yield takeLatest(DELETE_VISIT, deleteFlow);
}

export default visitsSagaWatcher;
