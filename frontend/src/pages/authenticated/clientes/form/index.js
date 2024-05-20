import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { findClientById, addClient, editClient } from 'services/clientes.service';

// Data
import formJson from './data/form';

// Custom components
import FormBody from './components/formBody';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';

import { numberToString, removeSpecialCharacter, numberStringToNumber } from 'utils/mask';
import { FormControlUnstyledContext } from '@mui/base';

function Form(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(formJson);
  const [clientId, setClientId] = useState();
  const [result, setResult] = useState({});
  const [requestsData, setRequestsData] = useState({});
  // view, edit, new
  const [type, setType] = useState('new');

  const saveFunc = (values) => {
    let mapObject = {};
    if (searchParams && searchParams.get('id')) {
      return new Promise((res, rej) => {
        const empresas = requestsData['empresas'].filter((e) => values.empresas.includes(e.id));
        for (let index in values) {
          if (index == 'localidade' && values[index]) {
            mapObject['cidade'] = values[index];
          } else if (index == 'uf' && values[index]) {
            mapObject['estado'] = values[index];
          } else if (index == 'cpf' && values[index]) {
            mapObject[index] = removeSpecialCharacter(values[index] + '');
          } else if (index == 'cep' && values[index]) {
            mapObject[index] = removeSpecialCharacter(values[index] + '');
          } else if (index == 'empresas' && values[index]) {
            mapObject[index] = empresas;
          } else if (index == 'dtNascimento' && values[index]) {
            mapObject[index] = new Date(values[index]);
          } else if (index == 'numero' && values[index]) {
            mapObject[index] = values[index] + '';
          } else if (values[index]) {
            mapObject[index] = values[index];
          }
        }
        mapObject['dtAtualizacao'] = new Date().toISOString();
        mapObject['id'] = searchParams.get('id');
        mapObject['status'] = true;
        editClient(clientId, mapObject)
          .then(() => res())
          .catch((err) => rej(err));
        setType('edit');
      });
    } else {
      const empresas = requestsData['empresas'].filter((e) => values.empresas.includes(e.id));
      return new Promise((res, rej) => {
        mapObject = {
          nome: values.nome,
          cpf: removeSpecialCharacter(values.cpf),
          dtNascimento: new Date(values.dtNascimento),
          cep: removeSpecialCharacter(values.cep),
          estado: values.uf,
          cidade: values.localidade,
          numero: values.numero + '',
          bairro: values.bairro,
          logradouro: values.logradouro,
          chavePix: values.chavePix,
          status: true,
          empresas: empresas,
        };
        addClient(mapObject)
          .then(() => res())
          .catch((err) => rej(err));
      });
    }
  };

  useEffect(() => {
    if (searchParams && searchParams.get('id')) {
      setClientId(searchParams.get('id'));
    }
  }, [formData]);

  const fetchClient = async () => {
    findClientById(clientId)
      .then((data) => {
        const mapObject = {
          chavePix: data.chavePix,
          bairro: data.bairro,
          cep: data.cep,
          cpf: data.cpf,
          dtNascimento: data.dtNascimento.split('T')[0],
          localidade: data.cidade,
          logradouro: data.logradouro,
          nome: data.nome,
          numero: data.numero,
          uf: data.estado,
          empresas: data.empresas?.map((e) => e.id),
        };
        setResult(mapObject);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const handleRequests = (addData) => {
    if (!addData) {
      return requestsData;
    } else {
      setRequestsData(addData);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormBody
        formData={formData}
        dataBaseInfo={result}
        saveFunc={saveFunc}
        formType={type}
        requestsData={handleRequests}
      />
    </DashboardLayout>
  );
}

export default Form;
