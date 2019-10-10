import { SET_ALERT } from './../actions/alert-actions';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return {
        alertType: payload.alertType,
        title: payload.title,
        message: payload.message
      };
    default:
      return state;
  }
}
