// Helper for api errors
import { handleApiErrors, handleApiErrorsText } from './../lib/api-errors';

import { checkJWT } from './../lib/jwt-methods';

const handleRequest = request => {
  return request
    .then(handleApiErrors)
    .then(response => {
      if (response.message === 'Not Found') {
        throw Error(response.message);
      } else {
        return { response };
      }
    })
    .catch(error => ({ error }));
};

export const apiGetLoggedUser = (url, tokenuser) => {
  const request = fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': tokenuser
    }
  });
  return handleRequest(request);
};

export const apiGet = url => {
  const request = fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': checkJWT()
    }
  });
  return handleRequest(request);
};

export const apiGetHTML = url => {
  return fetch(`${url}`, {
    method: 'GET',
    headers: {
      'x-auth-token': checkJWT()
    }
  });
};

export const apiPost = (url, obj) => {
  const request = fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': checkJWT()
    }
  });
  return handleRequest(request);
};

export const apiPostText = (url, obj) => {
  return fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': checkJWT()
    }
  }).then(handleApiErrorsText);
};

export const apiPut = (url, id, obj) => {
  const request = fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': checkJWT()
    }
  });
  return handleRequest(request);
};

export const apiDelete = (url, id) => {
  const request = fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': checkJWT()
    }
  });
  return handleRequest(request);
  //return id;
};
