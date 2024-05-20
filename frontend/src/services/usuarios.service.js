import axios from 'utils/axios.backend';
const BASE_PATH = '/usuarios'

export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const findUserByEmail = (userEmail = '') => {
  if(!userEmail){
    throw 'Error: User email not send'
  }

  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/email/${userEmail}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const findUserById = (userId = '') => {
  if(!userId){
    throw 'Error: User id not send'
  }
  
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/${userId}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const findUserByCPF = (cpf = '') => {
  if(!cpf){
    throw 'Error: User id not send'
  }
  
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/cpf/${cpf}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const addUser = (userBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${BASE_PATH}`, userBody);
      resolve(response.data);
      console.log("response:", response)
    } catch (err) {
      console.log("err:", err)
      reject(err);
    }
  });
}

export const editUser = (userBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${BASE_PATH}`, userBody);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const inactiveUser = (userId) => {
  if(!userId){
    throw 'Error: User id not send'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${BASE_PATH}/inactive/${userId}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const activeUser = (userId) => {
  if(!userId){
    throw 'Error: User id not send'
  }
  
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${BASE_PATH}/active/${userId}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
