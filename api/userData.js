import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users?uid=${uid}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.length) {
        resolve(response[0]);
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const searchUsers = (input, myUser) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/search_users?query=${input}&user_id=${myUser.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response;
    })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    image_url: user.image_url,
    email: user.email,
  };
  fetch(`${dbUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getUserByUserId = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        image_url: data.image_url,
        email: data.email,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    id: user.id,
    uid: user.uid,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    image_url: user.image_url,
    email: user.email,
  };
  fetch(`${dbUrl}/users/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getUserByUid,
  createUser,
  deleteSingleUser,
  updateUser,
  getUserByUserId,
  getAllUsers,
  searchUsers,
};
