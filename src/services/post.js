import axios from 'axios';
const baseUrl = '/api/posts';

const getAll = async () => {
  const response = axios.get(baseUrl);
  return (await response).data;
}

const create = async (obj, config) => {
  const response = await axios.post(baseUrl, obj, config);
  return response.data;
}

export default { getAll, create }