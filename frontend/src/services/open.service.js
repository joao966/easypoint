import axios from 'utils/axios.backend';
const BASE_PATH = '/comanda'

export const getAllOrdersOpen = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/status/open`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const createOpenLancamento = (payload) => {
  if (!payload) {
    throw 'Error: Need to send orders open in data'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${BASE_PATH}`, payload);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const updateLancamento = (payload) => {
  console.log("payload:", payload)
  if (!payload) {
    throw 'Error: Need to send orders open in data'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${BASE_PATH}`, payload);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
