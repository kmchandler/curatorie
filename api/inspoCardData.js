import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createInspoCard = (inspoCard) => new Promise((resolve, reject) => {
  const inspoCardObj = {
    board_id: inspoCard.board_id,
    user_id: inspoCard.user_id,
    image_url: inspoCard.image_url,
    description: inspoCard.description,
    priority: inspoCard.priority,
  };
  fetch(`${dbUrl}/inspo_cards`, {
    method: 'POST',
    body: JSON.stringify(inspoCardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getInspoCards = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/inspo_cards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getInspoCardById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/inspo_cards/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        board_id: data.board_id,
        user_id: data.user_id,
        image_url: data.image_url,
        description: data.description,
        priority: data.priority,
      });
    })
    .catch((error) => reject(error));
});

const getInspoCardsByBoardId = (boardId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/inspo_cards?board_id=${boardId}`)
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

const deleteSingleInspoCard = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/inspo_cards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateInspoCard = (inspoCard) => new Promise((resolve, reject) => {
  const inspoCardObj = {
    board_id: inspoCard.board_id,
    user_id: inspoCard.user_id,
    image_url: inspoCard.image_url,
    description: inspoCard.description,
    priority: inspoCard.priority,
  };
  fetch(`${dbUrl}/inspo_cards/${inspoCard.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inspoCardObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  createInspoCard,
  getInspoCards,
  deleteSingleInspoCard,
  updateInspoCard,
  getInspoCardById,
  getInspoCardsByBoardId,
};
