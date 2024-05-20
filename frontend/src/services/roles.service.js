import axios from 'utils/axios.backend';
const BASE_PATH = '/roles'

export const getAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const createRole = (roleData) => {
  if (!roleData) {
    throw 'Error: Need to send role data'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${BASE_PATH}`,roleData);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const updateRole = (roleData) => {
  if (!roleData) {
    throw 'Error: Need to send edited role'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.update(`${BASE_PATH}`, roleData);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const deleteRole = (roleId) => {
  if (!roleId) {
    throw 'Error: Need to send edited role'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.delete(`${BASE_PATH}/${roleId}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}