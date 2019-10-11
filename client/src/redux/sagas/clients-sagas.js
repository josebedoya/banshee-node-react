import { call, put, takeLatest } from 'redux-saga/effects';

import history from './../../history';

import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  INSERT_CLIENT,
  INSERT_CLIENT_SUCCESS,
  INSERT_CLIENT_ERROR,
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR
} from './../actions/clients-actions';

import { SET_ALERT } from './../actions/alert-actions';

import { urlClients } from './../../api/api-urls';
import { apiGet, apiPost, apiPut, apiDelete } from './../../api/api-methods';

function* fetchFlow() {
  const { response, error } = yield call(() => apiGet(`${urlClients}`));
  if (response) {
    yield put({ type: FETCH_CLIENTS_SUCCESS, payload: response });
  } else {
    yield put({ type: FETCH_CLIENTS_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'List of clients',
      message: 'An error occurred while loading clients'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* insertFlow(action) {
  const { client } = action;
  console.log(client);
  const newClient = {
    nit: client.nit,
    fullname: client.fullname,
    address: client.address,
    phone: client.phone || '',
    phone: client.phone || '',
    credit_limit: client.credit_limit,
    visits_percentage: client.visits_percentage,
    countryId: 1,
    stateId: 1,
    cityId: 1
  };
  console.log(newClient);
  const { response, error } = yield call(() =>
    apiPost(`${urlClients}`, newClient)
  );
  if (response) {
    yield put({ type: INSERT_CLIENT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Client created',
      message: 'Client has been created'
    };
    yield put({ type: SET_ALERT, payload: alert });
    history.push('/app/clients');
  } else {
    yield put({ type: INSERT_CLIENT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error creating client',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* updateFlow(action) {
  const { id, client } = action;
  const updClient = {
    nit: client.nit,
    fullname: client.fullname,
    address: client.address,
    phone: client.phone
  };
  const { response, error } = yield call(() =>
    apiPut(urlClients, id, updClient)
  );
  if (response) {
    yield put({ type: UPDATE_CLIENT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Client updated',
      message: 'Client has been updated'
    };
    yield put({ type: SET_ALERT, payload: alert });
  } else {
    yield put({ type: UPDATE_CLIENT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error updating client',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* deleteFlow(action) {
  const { id } = action;
  const { response, error } = yield call(() => apiDelete(urlClients, id));
  if (response) {
    yield put({ type: DELETE_CLIENT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Client deleted',
      message: 'Client has been deleted'
    };
    yield put({ type: SET_ALERT, payload: alert });
  } else {
    yield put({ type: DELETE_CLIENT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error deleting client',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* clientsSagaWatcher() {
  yield takeLatest(FETCH_CLIENTS, fetchFlow);
  yield takeLatest(INSERT_CLIENT, insertFlow);
  yield takeLatest(UPDATE_CLIENT, updateFlow);
  yield takeLatest(DELETE_CLIENT, deleteFlow);
}

export default clientsSagaWatcher;
