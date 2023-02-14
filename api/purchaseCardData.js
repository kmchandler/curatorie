import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createPurchaseCard = (purchaseCard) => new Promise((resolve, reject) => {
  const purchaseCardObj = {
    board_id: purchaseCard.board_id,
    user_id: purchaseCard.user_id,
    link: purchaseCard.link,
    image_url: purchaseCard.image_url,
    item: purchaseCard.item,
    description: purchaseCard.description,
    price: purchaseCard.price,
    priority: purchaseCard.priority,
  };
  fetch(`${dbUrl}/purchase_cards`, {
    method: 'POST',
    body: JSON.stringify(purchaseCardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getPurchaseCards = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/purchase_cards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPurchaseCardById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/purchase_cards/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        board_id: data.board_id,
        user_id: data.user_id,
        link: data.link,
        image_url: data.image_url,
        item: data.item,
        description: data.description,
        price: data.price,
        priority: data.priority,
      });
    })
    .catch((error) => reject(error));
});

const getPurchaseCardsByBoardId = (boardId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/purchase_cards?board=${boardId}`)
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

const deleteSinglePurchaseCard = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/purchase_cards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updatePurchaseCard = (purchaseCard) => new Promise((resolve, reject) => {
  const purchaseCardObj = {
    board_id: purchaseCard.board_id,
    user_id: purchaseCard.user_id,
    link: purchaseCard.link,
    image_url: purchaseCard.image_url,
    item: purchaseCard.item,
    description: purchaseCard.description,
    price: purchaseCard.price,
    priority: purchaseCard.priority,
  };
  fetch(`${dbUrl}/purchase_cards/${purchaseCard.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchaseCardObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  createPurchaseCard,
  getPurchaseCards,
  deleteSinglePurchaseCard,
  updatePurchaseCard,
  getPurchaseCardById,
  getPurchaseCardsByBoardId,
};
