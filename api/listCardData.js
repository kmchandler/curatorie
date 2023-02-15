import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createListCard = (listCard) => new Promise((resolve, reject) => {
  const listCardObj = {
    board_id: listCard.board_id,
    user_id: listCard.user_id,
    list_item: listCard.list_item,
    priority: listCard.priority,
  };
  fetch(`${dbUrl}/list_cards`, {
    method: 'POST',
    body: JSON.stringify(listCardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getListCards = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/list_cards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getListCardById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/list_cards/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        board_id: data.board_id,
        user_id: data.user_id,
        list_item: data.list_item,
        priority: data.priority,
      });
    })
    .catch((error) => reject(error));
});

const getListCardsByBoardId = (boardId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/list_cards?board_id=${boardId}`)
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

const deleteSingleListCard = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/list_cards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateListCard = (listCard) => new Promise((resolve, reject) => {
  const listCardObj = {
    board_id: listCard.board_id,
    user_id: listCard.user_id,
    list_item: listCard.list_item,
    priority: listCard.priority,
  };
  fetch(`${dbUrl}/lsit_cards/${listCard.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listCardObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  createListCard,
  getListCards,
  deleteSingleListCard,
  updateListCard,
  getListCardById,
  getListCardsByBoardId,
};
