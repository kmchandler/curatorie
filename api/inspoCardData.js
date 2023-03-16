import {
  get, remove, edit, create,
} from './base';

const createInspoCard = async (inspoCard) => {
  const response = await create('/inspo_cards', JSON.stringify(inspoCard));
  return response;
};

const getInspoCards = async () => {
  const response = await get('/inspo_cards');
  return response;
};

const getInspoCardById = async (id) => {
  const response = await get(`/inspo_cards/${id}`);
  return response;
};

const getInspoCardsByBoardId = async (boardId) => {
  const response = get(`/inspo_cards?board_id=${boardId}`);
  return response;
};

const deleteSingleInspoCard = async (id) => {
  const response = await remove(`/inspo_cards/${id}`);
  return response;
};

const updateInspoCard = async (inspoCard) => {
  const response = await edit(`/inspo_cards/${inspoCard.id}`, JSON.stringify(inspoCard));
  return response;
};

export {
  createInspoCard,
  getInspoCards,
  deleteSingleInspoCard,
  updateInspoCard,
  getInspoCardById,
  getInspoCardsByBoardId,
};
