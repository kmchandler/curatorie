import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/types`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getTypes;
