// Action definitions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

// Action creators
export const loadUserRequest = token => ({
  type: LOAD_USER_REQUEST,
  token
});

export const loginRequest = user => ({
  type: LOGIN_REQUEST,
  user
});

export const logout = () => ({ type: LOGOUT });
