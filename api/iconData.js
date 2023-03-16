import { get } from './base';

const getIcons = async () => {
  const response = await get('/icons');
  return response;
};

export default getIcons;
