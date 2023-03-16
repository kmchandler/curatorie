import {
  get, remove, edit, create,
} from './base';

const createBoard = async (board) => {
  const boardObj = {
    user_id: board.user_id,
    name: board.name,
    icon: board.icon,
  };
  return create('/boards', JSON.stringify(boardObj));
};

const getBoardById = async (id) => {
  const response = await get(`/boards/${id}`);
  return response;
};

const getBoardsByUserId = async (userId) => {
  const response = await get(`/boards?user_id=${userId}`);
  return response;
};

const deleteSingleBoard = async (id) => {
  const response = await remove(`/boards/${id}`);
  return response;
};

const updateBoard = async (board) => {
  const response = await edit(`/boards/${board.id}`, JSON.stringify(board));
  return response;
};

export {
  createBoard,
  deleteSingleBoard,
  updateBoard,
  getBoardById,
  getBoardsByUserId,
};
