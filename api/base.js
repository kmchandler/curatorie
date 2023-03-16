/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

export const create = async (path, body) => {
  const response = await fetch(`${dbUrl}${path}`, {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${window.fbIdToken}`,
    },
  });
  const responseJson = await response.json();
  if (response.ok) {
    return responseJson;
  }
  throw new Error(responseJson.message);
};

export const get = async (path) => {
  const response = await fetch(`${dbUrl}${path}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${window.fbIdToken}`,
    },
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.message);
};

export const remove = async (path) => {
  const response = await fetch(`${dbUrl}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${window.fbIdToken}`,
    },
  });
  if (response.ok) {
    return response;
  }
  return Promise.reject(response.message);
};

export const edit = async (path, body) => {
  const response = await fetch(`${dbUrl}${path}`, {
    method: 'PUT',
    body,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${window.fbIdToken}`,
    },
  });
  if (response.ok) {
    return response;
  }
  return Promise.reject(response.message);
};
