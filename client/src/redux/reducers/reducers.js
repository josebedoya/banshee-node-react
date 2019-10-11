import { combineReducers } from 'redux';

import { LOGOUT } from './../actions/auth-actions';

import alert from './alert-reducer';
import auth from './auth-reducer';
import agents from './agents-reducer';
import clients from './clients-reducer';

import { reducer as reduxForm } from 'redux-form';

const reducers = combineReducers({
  alert,
  auth,
  agents,
  clients,
  form: reduxForm
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;
