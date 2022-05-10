import axios from 'axios';;
const baseUrl = '/api/users';

const signUp = async obj => {
  const response = await axios.post(baseUrl, obj);
  return response.data;
}

export default { signUp } //eslint-disable-line