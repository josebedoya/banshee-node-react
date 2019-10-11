// Action definition
export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';

export const INSERT_CLIENT = 'INSERT_CLIENT';
export const INSERT_CLIENT_SUCCESS = 'INSERT_CLIENT_SUCCESS';
export const INSERT_CLIENT_ERROR = 'INSERT_CLIENT_ERROR';

export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_ERROR = 'UPDATE_CLIENT_ERROR';

export const DELETE_CLIENT = 'DELETE_CLIENT';
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_ERROR = 'DELETE_CLIENT_ERROR';

// Action creators
export const fetchClients = () => ({
  type: FETCH_CLIENTS
});

export const insertClient = client => ({
  type: INSERT_CLIENT,
  client
});

export const updateClient = (id, client) => ({
  type: UPDATE_CLIENT,
  id,
  client
});

export const deleteClient = id => ({
  type: DELETE_CLIENT,
  id
});
