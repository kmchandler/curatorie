import {
  get, remove, edit, create,
} from './base';

const createPurchaseCard = async (purchaseCard) => {
  const response = await create('/purchase_cards', JSON.stringify(purchaseCard));
  return response;
};

const getPurchaseCards = async () => {
  const response = await get('/purchase_cards');
  return response;
};

const getPurchaseCardById = async (id) => {
  const response = await get(`/purchase_cards/${id}`);
  return response;
};

const getPurchaseCardsByBoardId = async (boardId) => {
  const response = await get(`/purchase_cards?board_id=${boardId}`);
  return response;
};

const deleteSinglePurchaseCard = async (id) => {
  const response = await remove(`/purchase_cards/${id}`);
  return response;
};

const updatePurchaseCard = async (purchaseCard) => {
  const response = await edit(`/purchase_cards/${purchaseCard.id}`, JSON.stringify(purchaseCard));
  return response;
};

export {
  createPurchaseCard,
  getPurchaseCards,
  deleteSinglePurchaseCard,
  updatePurchaseCard,
  getPurchaseCardById,
  getPurchaseCardsByBoardId,
};
