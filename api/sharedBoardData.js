import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createSharedBoard = (sharedBoard) => new Promise((resolve, reject) => {
  const sharedBoardObj = {
    user_id: sharedBoard.user_id,
    board_id: sharedBoard.board_id,
  };
  fetch(`${dbUrl}/shared_boards`, {
    method: 'POST',
    body: JSON.stringify(sharedBoardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSharedBoardById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/shared_boards/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user_id: data.user_id,
        board_id: data.board_id,
      });
    })
    .catch((error) => reject(error));
});

const getSharedBoardsByUserId = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/shared_boards?user_id=${userId}`)
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        resolve(response);
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSharedBoards = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/shared_boards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleSharedBoard = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/shared_boards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createSharedBoard,
  deleteSingleSharedBoard,
  getSharedBoardById,
  getSharedBoards,
  getSharedBoardsByUserId,
};
