import {
  get, remove, create,
} from './base';

const createBoardType = async (boardType) => {
  const response = await create('/board_types', JSON.stringify(boardType));
  return response;
};

const getBoardTypeById = async (id) => {
  const response = await get(`board_types/${id}`);
  return response;
};

const getBoardTypeByBoardId = async (boardId) => {
  const response = await get(`/board_types?board_id=${boardId}`);
  return response;
};

const getBoardTypes = async () => {
  const response = await get('/board_types');
  return response;
};

const deleteSingleBoardType = async (id) => {
  const response = await remove(`/board_types/${id}`);
  return response;
};

export {
  createBoardType,
  deleteSingleBoardType,
  getBoardTypeById,
  getBoardTypes,
  getBoardTypeByBoardId,
};
