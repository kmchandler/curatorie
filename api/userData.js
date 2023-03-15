import {
  get, remove, edit, create,
} from './base';

const getUserByUid = async (uid) => {
  const response = await get(`/users?uid=${uid}`);
  return response[0];
};

const getAllUsers = async () => {
  const response = await get('/users');
  return response;
};

// const searchUsers = (input, myUser) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/search_users?query=${input}&user_id=${myUser.id}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.message);
//       }
//       return response;
//     })
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

const searchUsers = async (input, myUser) => {
  const response = await get(`/search_users?query=${input}&user_id=${myUser.id}`);
  return response;
};

const createUser = async (user) => {
  const response = await create('/users', JSON.stringify(user));
  return response;
};

const getUserByUserId = async (id) => {
  const response = await get(`/users/${id}`);
  return response;
};

const deleteSingleUser = async (id) => {
  const response = await remove(`/users/${id}`);
  return response;
};

const updateUser = async (user) => {
  const response = await edit(`/users/${user.id}`, JSON.stringify(user));
  return response;
};

export {
  getUserByUid,
  createUser,
  deleteSingleUser,
  updateUser,
  getUserByUserId,
  getAllUsers,
  searchUsers,
};
