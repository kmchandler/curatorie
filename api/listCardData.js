import {
  get, remove, edit, create,
} from './base';

const createListCard = async (listCard) => {
  const response = await create('/list_cards', JSON.stringify(listCard));
  return response;
};

const getListCards = async () => {
  const response = await get('/list_cards');
  return response;
};

const getListCardById = async (id) => {
  const response = await get(`/list_cards/${id}`);
  return response;
};

const getListCardsByBoardId = async (boardId) => {
  const response = await get(`/list_cards?board_id=${boardId}`);
  return response;
};

const deleteSingleListCard = async (id) => {
  const response = await remove(`/list_cards/${id}`);
  return response;
};

const updateListCard = async (listCard) => {
  const response = await edit(`/list_cards/${listCard.id}`, JSON.stringify(listCard));
  return response;
};

export {
  createListCard,
  getListCards,
  deleteSingleListCard,
  updateListCard,
  getListCardById,
  getListCardsByBoardId,
};
