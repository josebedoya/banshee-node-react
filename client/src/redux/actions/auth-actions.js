// Action definitions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER2 = 'LOAD_USER2';
export const AUTH_ERROR = 'AUTH_ERROR';

// Action creators
export const loadUser = token => ({
  type: LOAD_USER2,
  token
});

export const loginRequest = user => ({
  type: LOGIN_REQUEST,
  user
});
