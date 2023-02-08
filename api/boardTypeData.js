import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createBoardType = (boardType) => new Promise((resolve, reject) => {
  const boardTypeObj = {
    type: boardType.type,
  };
  fetch(`${dbUrl}/board_types`, {
    method: 'POST',
    body: JSON.stringify(boardTypeObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getBoardTypeById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/board_types/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        type: data.type,
      });
    })
    .catch((error) => reject(error));
});

const getBoardTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/board_types`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleBoardType = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/board_types/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateBoardType = (board) => new Promise((resolve, reject) => {
  const boardTypeObj = {
    id: board.id,
    type: board.type,
  };
  fetch(`${dbUrl}/board_types/${boardTypeObj.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boardTypeObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  createBoardType,
  deleteSingleBoardType,
  updateBoardType,
  getBoardTypeById,
  getBoardTypes,
};
