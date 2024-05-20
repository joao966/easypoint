import axios from 'utils/axios.backend';

export function login(cpf, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        username: cpf,
        password: password,
      };

      let response = await axios.post(`/auth/login`, body);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export function changePassword(userId, password, confirmPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        password: password,
        reviewPassword: confirmPassword,
      };

      let response = await axios.put(`/usuarios/pending/${userId}`, body);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
