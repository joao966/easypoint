import axios from 'utils/axios.backend';
const BASE_PATH = '/comanda'

export const getClosed = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/status/closed`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};
