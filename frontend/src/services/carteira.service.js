import axios from 'utils/axios.backend';
const BASE_PATH = '/empresa/carteira'

export const findAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/all`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};
