import axios from 'axios';
const baseUrl = '/api/posts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (obj, config) => {
  const response = await axios.post(baseUrl, obj, config);
  return response.data;
}

const update = async (id, obj) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj);
  return response.data;
}

const deletePost = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { getAll, create, update, deletePost } //eslint-disable-line