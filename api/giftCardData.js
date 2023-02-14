import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createGiftCard = (giftCard) => new Promise((resolve, reject) => {
  const giftCardObj = {
    board_id: giftCard.board_id,
    user_id: giftCard.user_id,
    link: giftCard.link,
    image_url: giftCard.image_url,
    item: giftCard.item,
    description: giftCard.description,
    price: giftCard.price,
    occasion: giftCard.occasion,
    gift_for: giftCard.gift_for,
    name: giftCard.name,
    priority: giftCard.priority,
  };
  fetch(`${dbUrl}/gift_cards`, {
    method: 'POST',
    body: JSON.stringify(giftCardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getGiftCards = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gift_cards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGiftCardById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gift_cards/${id}`)
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
        occasion: data.occasion,
        gift_for: data.gift_for,
        name: data.name,
        priority: data.priority,
      });
    })
    .catch((error) => reject(error));
});

const getGiftCardsByBoardId = (boardId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gift_cards?board=${boardId}`)
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

const deleteSingleGiftCard = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gift_cards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateGiftCard = (giftCard) => new Promise((resolve, reject) => {
  const giftCardObj = {
    board_id: giftCard.board_id,
    user_id: giftCard.user_id,
    link: giftCard.link,
    image_url: giftCard.image_url,
    item: giftCard.item,
    description: giftCard.description,
    price: giftCard.price,
    occasion: giftCard.occasion,
    gift_for: giftCard.gift_for,
    name: giftCard.name,
    priority: giftCard.priority,
  };
  fetch(`${dbUrl}/gift_cards/${giftCard.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(giftCardObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  createGiftCard,
  getGiftCards,
  deleteSingleGiftCard,
  updateGiftCard,
  getGiftCardById,
  getGiftCardsByBoardId,
};
