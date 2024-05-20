import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { findUserById, addUser, editUser } from 'services/usuarios.service';

// Data
import formJson from './data/form';

// Custom components
import FormBody from './components/formBody';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';

import { removeSpecialCharacter, stringToNumber, numberStringToNumber } from 'utils/mask';

function Form(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(formJson);
  const [userId, setUserId] = useState();
  const [result, setResult] = useState({});
  // view, edit, new
  const [type, setType] = useState('new');

  const saveFunc = (values) => {
    let mapObject = {};
    if (searchParams && searchParams.get('id')) {
      return new Promise((res, rej) => {
        for (let index in values) {
          if (index == 'password' && values[index]) {
            mapObject['senha'] = values[index];
          } else if (index == 'phone' && values[index]) {
            mapObject['phone'] = removeSpecialCharacter(values[index]);
          } else if (index == 'localidade' && values[index]) {
            mapObject['cidade'] = values[index];
          } else if (index == 'uf' && values[index]) {
            mapObject['estado'] = values[index];
          } else if (index == 'cofirmpassword' || index == 'logradouro') {
          } else if (index == 'cpf' && values[index]) {
            mapObject[index] = removeSpecialCharacter(values[index]);
          } else if (index == 'cep' && values[index]) {
            mapObject[index] = removeSpecialCharacter(values[index]);
          } else if (values[index]) {
            mapObject[index] = values[index];
          }
        }
        mapObject['dtAtualizacao'] = new Date().toISOString();
        mapObject['id'] = searchParams.get('id');
        mapObject['numero'] = String(values['numero']);
        editUser(mapObject)
          .then(() => res())
          .catch((err) => rej(err));
        setType('edit');
      });
    } else {
      return new Promise((res, rej) => {
        mapObject = {
          nome: values.nome,
          email: values.email,
          senha: values.password,
          phone: removeSpecialCharacter(values.phone),
          cpf: removeSpecialCharacter(values.cpf),
          cep: removeSpecialCharacter(values.cep),
          logradouro: values.logradouro,
          estado: values.uf,
          cidade: values.localidade,
          numero: String(values.numero) + '',
          bairro: values.bairro,
          status: 'P',
          idRole: '1',
        };
        addUser(mapObject)
          .then(() => res())
          .catch((err) => rej(err));
      });
    }
  };

  useEffect(() => {
    if (searchParams && searchParams.get('id')) {
      setUserId(searchParams.get('id'));
    }
  }, [formData]);

  const fetchUser = async () => {
    findUserById(userId)
      .then((data) => {
        const mapObject = {
          bairro: data.bairro,
          cep: data.cep,
          cofirmpassword: '',
          cpf: data.cpf,
          email: data.email,
          localidade: data.cidade,
          logradouro: data.logradouro,
          nome: data.nome,
          numero: data.numero,
          password: '',
          celular: data.celular,
          uf: data.estado,
        };
        setResult(mapObject);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormBody formData={formData} dataBaseInfo={result} saveFunc={saveFunc} formType={type} />
    </DashboardLayout>
  );
}

export default Form;
