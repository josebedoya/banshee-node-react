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
  DELETE_CLIENT_SUCCESS
} from './../actions/clients-actions';

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
    case FETCH_CLIENTS:
      return {
        ...state,
        isFetching: true,
        data: []
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload
      };
    case FETCH_CLIENTS_ERROR:
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
    case INSERT_CLIENT:
      return {
        ...state,
        isUpdating: true,
        data: state.data
      };
    case INSERT_CLIENT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        data: state.data.concat([payload])
      };
    case INSERT_CLIENT_ERROR:
      return {
        ...state,
        isUpdating: false,
        errors: {
          status: error.toString(),
          time: new Date()
        }
      };
    //
    case UPDATE_CLIENT:
      return {
        isUpdating: true,
        data: state.data
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        isUpdating: false,
        data: state.data.reduce((acc, newData) => {
          if (newData.id === payload.id) {
            return [...acc, payload];
          } else {
            return [...acc, newData];
          }
        }, [])
      };
    case UPDATE_CLIENT_ERROR:
      return {
        ...state,
        isUpdating: false
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        data: state.data.filter(d => d.id !== payload.id)
      };

    default:
      return state;
  }
}

// Selectors
export const getClientById = createSelector(
  (state, props) =>
    state.clients.data.find(d => Number(d.id) === Number(props.id)),
  client => client
);
