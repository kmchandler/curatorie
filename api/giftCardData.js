import {
  get, remove, edit, create,
} from './base';

const createGiftCard = async (giftCard) => {
  const response = await create('/gift_cards', JSON.stringify(giftCard));
  return response;
};

const getGiftCards = async () => {
  const response = await get('/gift_cards');
  return response;
};

const getGiftCardById = async (id) => {
  const response = get(`/gift_cards/${id}`);
  return response;
};

const getGiftCardsByBoardId = async (boardId) => {
  const response = await get(`/gift_cards?board_id=${boardId}`);
  return response;
};

const deleteSingleGiftCard = async (id) => {
  const response = await remove(`/gift_cards/${id}`);
  return response;
};

const updateGiftCard = async (giftCard) => {
  const response = await edit(`/gift_cards/${giftCard.id}`, JSON.stringify(giftCard));
  return response;
};

export {
  createGiftCard,
  getGiftCards,
  deleteSingleGiftCard,
  updateGiftCard,
  getGiftCardById,
  getGiftCardsByBoardId,
};
