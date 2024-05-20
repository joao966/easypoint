import axios from 'utils/axios.backend';
const BASE_PATH = '/cliente'

export const getAllClients = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const findClientById = (clientId = '') => {
  if(!clientId){
    throw 'Error: User id not send'
  }
  
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/${clientId}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const addClient = (clientBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${BASE_PATH}`, clientBody);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const editClient = (clientId,clientBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${BASE_PATH}/${clientId}`, clientBody);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
