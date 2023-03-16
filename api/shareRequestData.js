import {
  get, remove, create,
} from './base';

const createShareRequest = async (shareRequest) => {
  try {
    const response = await create('/share_requests', JSON.stringify(shareRequest));
    return response;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

const getShareRequestById = async (id) => {
  const response = await get(`/share_requests/${id}`);
  return response;
};

const getShareRequestsByUserId = async (userId) => {
  const response = await get(`/share_requests?user_id=${userId}`);
  return response;
};

const getShareRequests = async () => {
  const response = get('/share_requests');
  return response;
};

const deleteSingleShareRequest = async (id) => {
  const response = await remove(`/share_requests/${id}`);
  return response;
};

export {
  createShareRequest,
  deleteSingleShareRequest,
  getShareRequestById,
  getShareRequests,
  getShareRequestsByUserId,
};
