import { call, put, takeLatest } from 'redux-saga/effects';

import history from './../../history';

import {
  FETCH_AGENTS,
  FETCH_AGENTS_SUCCESS,
  FETCH_AGENTS_ERROR,
  INSERT_AGENT,
  INSERT_AGENT_SUCCESS,
  INSERT_AGENT_ERROR,
  UPDATE_AGENT,
  UPDATE_AGENT_SUCCESS,
  UPDATE_AGENT_ERROR,
  DELETE_AGENT,
  DELETE_AGENT_SUCCESS,
  DELETE_AGENT_ERROR
} from './../actions/agents-actions';

import { SET_ALERT } from './../actions/alert-actions';

import { urlAgents } from './../../api/api-urls';
import { apiGet, apiPost, apiPut, apiDelete } from './../../api/api-methods';

function* fetchFlow() {
  const { response, error } = yield call(() => apiGet(`${urlAgents}`));
  if (response) {
    yield put({ type: FETCH_AGENTS_SUCCESS, payload: response });
  } else {
    yield put({ type: FETCH_AGENTS_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'List of agents',
      message: 'An error occurred while loading agents'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* insertFlow(action) {
  const { agent } = action;
  const newAgent = {
    name: agent.name
  };
  const { response, error } = yield call(() =>
    apiPost(`${urlAgents}`, newAgent)
  );
  if (response) {
    yield put({ type: INSERT_AGENT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Agent created',
      message: 'Agent has been created'
    };
    yield put({ type: SET_ALERT, payload: alert });
    history.push('/app/agents');
  } else {
    yield put({ type: INSERT_AGENT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error creating agent',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* updateFlow(action) {
  const { id, agent } = action;
  const updAgent = {
    name: agent.name
  };
  const { response, error } = yield call(() => apiPut(urlAgents, id, updAgent));
  if (response) {
    yield put({ type: UPDATE_AGENT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Agent updated',
      message: 'Agent has been updated'
    };
    yield put({ type: SET_ALERT, payload: alert });
  } else {
    yield put({ type: UPDATE_AGENT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error updating agent',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* deleteFlow(action) {
  const { id } = action;
  const { response, error } = yield call(() => apiDelete(urlAgents, id));
  if (response) {
    yield put({ type: DELETE_AGENT_SUCCESS, payload: response });
    let alert = {
      alertType: 'success',
      title: 'Agent deleted',
      message: 'Agent has been deleted'
    };
    yield put({ type: SET_ALERT, payload: alert });
  } else {
    yield put({ type: DELETE_AGENT_ERROR, error });
    let alert = {
      alertType: 'error',
      title: 'Error deleting agent',
      message: 'An error occurred while processing your request'
    };
    yield put({ type: SET_ALERT, payload: alert });
  }
}

function* agentsSagaWatcher() {
  yield takeLatest(FETCH_AGENTS, fetchFlow);
  yield takeLatest(INSERT_AGENT, insertFlow);
  yield takeLatest(UPDATE_AGENT, updateFlow);
  yield takeLatest(DELETE_AGENT, deleteFlow);
}

export default agentsSagaWatcher;
