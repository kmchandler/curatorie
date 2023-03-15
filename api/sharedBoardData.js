import {
  get, remove, create,
} from './base';

const createSharedBoard = async (sharedBoard) => {
  const response = await create('/shared_boards', JSON.stringify(sharedBoard));
  return response;
};

const getSharedBoardById = async (id) => {
  const response = await get(`/shared_boards/${id}`);
  return response;
};

const getSharedBoardsByUserId = async (userId) => {
  const response = await get(`/shared_boards?user_id=${userId}`);
  return response;
};

const getSharedBoards = async () => {
  const response = await get('/shared_boards');
  return response;
};

const deleteSingleSharedBoard = async (id) => {
  const response = await remove(`/shared_boards/${id}`);
  return response;
};

export {
  createSharedBoard,
  deleteSingleSharedBoard,
  getSharedBoardById,
  getSharedBoards,
  getSharedBoardsByUserId,
};
