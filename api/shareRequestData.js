import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createShareRequest = (shareRequest) => new Promise((resolve, reject) => {
  const shareRequestObj = {
    user_id: shareRequest.user_id,
    board_id: shareRequest.board_id,
  };
  fetch(`${dbUrl}/share_requests`, {
    method: 'POST',
    body: JSON.stringify(shareRequestObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getShareRequestById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/share_requests/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user_id: data.user_id,
        board_id: data.board_id,
      });
    })
    .catch((error) => reject(error));
});

const getShareRequestsByUserId = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/share_requests?user=${userId}`)
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

const getShareRequests = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/share_requests`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleShareRequest = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/share_requests/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createShareRequest,
  deleteSingleShareRequest,
  getShareRequestById,
  getShareRequests,
  getShareRequestsByUserId,
};
