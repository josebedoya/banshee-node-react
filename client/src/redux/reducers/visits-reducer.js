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
  DELETE_VISIT_SUCCESS
} from './../actions/visits-actions';

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
    case FETCH_VISITS:
      return {
        ...state,
        isFetching: true,
        data: []
      };
    case FETCH_VISITS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload
      };
    case FETCH_VISITS_ERROR:
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
    case INSERT_VISIT:
      return {
        ...state,
        isUpdating: true,
        data: state.data
      };
    case INSERT_VISIT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        data: state.data.concat([payload])
      };
    case INSERT_VISIT_ERROR:
      return {
        ...state,
        isUpdating: false,
        errors: {
          status: error.toString(),
          time: new Date()
        }
      };
    //
    case UPDATE_VISIT:
      return {
        isUpdating: true,
        data: state.data
      };
    case UPDATE_VISIT_SUCCESS:
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
    case UPDATE_VISIT_ERROR:
      return {
        ...state,
        isUpdating: false
      };
    case DELETE_VISIT_SUCCESS:
      return {
        data: state.data.filter(d => d.id !== payload.id)
      };

    default:
      return state;
  }
}

// Selectors
export const getVisitById = createSelector(
  (state, props) =>
    state.visits.data.find(d => Number(d.id) === Number(props.id)),
  visit => visit
);

export const getVisitsByClientId = (state, props) =>
  state.visits.data.filter(d => Number(d.clientId) === Number(props.id));
