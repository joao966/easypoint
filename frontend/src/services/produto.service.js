import axios from 'utils/axios.backend';
const BASE_PATH = '/produto'

export const getAllProducts = () => {  
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const findCompanyById = (companyId = '') => {
  if (!companyId) {
    throw 'Error: Company id not send'
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${BASE_PATH}/${companyId}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export const addProduct = (companyBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${BASE_PATH}`, companyBody);
      resolve(response.data);
    } catch (err) {
      console.log("err:", err)
      reject(err);
    }
  });
}

export const editProduct = (companyId, companyBody) => {
  if (!companyId) {
    throw 'Error: Company id not send'
  }

  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put(`${BASE_PATH}/${companyId}`, companyBody);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

// export const inactiveCompany = (companyId) => {
//   if (!companyId) {
//     throw 'Error: Company id not send'
//   }

//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = await axios.put(`${BASE_PATH}/inactive/${companyId}`);
//       resolve(response.data);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// export const activeCompany = (companyId) => {
//   if (!companyId) {
//     throw 'Error: Company id not send'
//   }

//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = await axios.put(`${BASE_PATH}/active/${companyId}`);
//       resolve(response.data);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }
