import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getIcons = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/icons`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getIcons;
