import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createBoard = (board) => new Promise((resolve, reject) => {
  const boardObj = {
    user_id: board.user_id,
    type: board.type,
    name: board.name,
    icon: board.icon,
  };
  fetch(`${dbUrl}/boards`, {
    method: 'POST',
    body: JSON.stringify(boardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getBoardById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/boards/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user_id: data.user_id,
        type: data.type,
        name: data.name,
        icon: data.icon,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleBoard = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/boards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateBoard = (board) => new Promise((resolve, reject) => {
  const boardObj = {
    id: board.id,
    user_id: board.user_id,
    type: board.type,
    name: board.name,
    icon: board.icon,
  };
  fetch(`${dbUrl}/boards/${board.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boardObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  createBoard,
  deleteSingleBoard,
  updateBoard,
  getBoardById,
};
