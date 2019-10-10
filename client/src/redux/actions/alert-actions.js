export const SET_ALERT = 'SET_ALERT';

export const setAlert = (alertType, title, message) => ({
  type: SET_ALERT,
  alertType,
  title,
  message
});
