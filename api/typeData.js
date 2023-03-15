import { get } from './base';

const getTypes = async () => {
  const response = await get('/types');
  return response;
};

export default getTypes;
