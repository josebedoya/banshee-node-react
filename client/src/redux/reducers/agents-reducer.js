import {
  FETCH_AGENTS,
  FETCH_AGENTS_SUCCESS,
  FETCH_AGENTS_ERROR,
  INSERT_AGENT,
  INSERT_AGENT_SUCCESS,
  INSERT_AGENT_ERROR
} from './../actions/agents-actions';

import { createSelector } from 'reselect';

const initialState = {
  isFetching: false,
  isUpdating: false,
  data: [],
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_AGENTS:
      return {
        ...state,
        isFetching: true,
        data: []
      };
    case FETCH_AGENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload
      };
    case FETCH_AGENTS_ERROR:
      return {
        ...state,
        isFetching: false,
        data: state.data,
        errors: {
          status: error.toString(),
          time: new Date()
        }
      };
    //
    case INSERT_AGENT:
      return {
        ...state,
        isUpdating: true,
        data: state.data
      };
    case INSERT_AGENT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        data: state.data.concat([payload.data])
      };
    case INSERT_AGENT_ERROR:
      return {
        ...state,
        isUpdating: false,
        errors: {
          status: error.toString(),
          time: new Date()
        }
      };

    default:
      return state;
  }
}

// Selectors
export const getagentById = createSelector(
  (state, props) => state.agents.data.find(d => d.id === props.id),
  agent => agent
);
