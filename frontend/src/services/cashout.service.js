import axios from 'utils/axios.backend';
const BASE_PATH_CSV = '/empresa/lancamento/validate-list';
const BASE_PATH_LANCAMENTO = '/empresa/lancamento/store-transactions';

export const addCsv = (lancamentoBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('transactions', lancamentoBody);
      let { data } = await axios.post(`${BASE_PATH_CSV}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      resolve(data);
    } catch (err) {
      resolve({ errors: [{ errors: true, message: err?.message || 'Erro interno da ame' }] });
    }
  });
};

export const addLancamento = (TransactionsBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${BASE_PATH_LANCAMENTO}`, TransactionsBody);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const uploadPedidos = (file) => {
  return new Promise((resolve, reject) => {
    let convertFile = file;
    let reader = new FileReader();
    reader.readAsText(convertFile);
    reader.onload = async (e) => {
      let csv = reader.result;
      let allTextLines = csv.split(/\r|\n|\r/);
      let lines = [];
      for (let i = 0; i < allTextLines.length + 1; i += 1) {
        if (allTextLines[i + 1]) {
          let each = allTextLines[i + 1].split(',');
          lines.push(each);
        }
      }
      resolve(lines);
    };
    reader.onerror = (error) => reject(error);
  });
};
