import axios from "axios";

export const fetchCEP = async (cepRequested, formikValues, requestsData) => {
  axios.get(`https://viacep.com.br/ws/${cepRequested}/json/`).then(({ data }) => {
    if (data && formikValues) {
      for (let item in data) {
        if (Object.keys(formikValues).includes(item)) {
          formikValues[item] = data[item]
        }
      }
    }
    if(requestsData) {
      const requests = requestsData()
        requests[id] = data
        requestsData(requests)
    }
  }).catch((err) => { console.error(err) })
};
