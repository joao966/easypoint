

import React, { useEffect, useState } from 'react';

import { useSearchParams } from "react-router-dom";

import { findCompanyById, addProduct, editProduct } from 'services/produto.service';

// Utils
import { numberToString, removeSpecialCharacter, numberStringToNumber } from 'utils/mask';

// Data
import formJson from './data/form';

// Custom components
import FormBody from './components/formBody';

// Soft UI Dashboard React components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";

function Form(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(formJson);
  const [companyId, setCompanyId] = useState();
  const [result, setResult] = useState({});

  const saveFunc = (values) => {
    let mapObject = {}
    if (searchParams && searchParams.get("id")) {
      return new Promise((res, rej) => {
        for (let index in values) {
          if (index == 'razaoSocial' && values[index]) {
            mapObject['nome'] = values[index]
          } else if (index == 'cnpj' && values[index]) {
            mapObject['documento'] = removeSpecialCharacter(values[index])
          } else if (index == 'telfixo' && values[index]) {
            mapObject['telefone'] = removeSpecialCharacter(values[index])
          } else if (index == 'telcel' && values[index]) {
            mapObject['celular'] = removeSpecialCharacter(values[index])
          } else if (index == 'uf' && values[index]) {
            mapObject['estado'] = values[index]
          } else if (values[index]) {
            mapObject[index] = values[index]
          }
        }
        mapObject['dtAtualizacao'] = new Date().toISOString()
        editProduct(searchParams.get("id"), mapObject).then(() => res()).catch(err => rej(err))
      })
    } else {

      return new Promise((res, rej) => {
        mapObject = {
          "dtAtualizacao": new Date().toISOString(),
          "name": values?.name,
          "price": values?.price,
          "category": values?.category,
          "quantity": Number(values?.quantity),
          "imageUrl": values?.imageUrl
        }
        addProduct(mapObject).then(() => res()).catch(err => rej(err))
      })
    }
  }

  useEffect(() => {
    if (searchParams && searchParams.get("id")) {
      setCompanyId(searchParams.get("id"))
    }
  }, [formData])

  const fetchCompany = async () => {
    findCompanyById(companyId).then(data => {
      const mapObject = {
        cnpj: data.documento,
        taxaTransacao: numberToString(data.taxaTransacao),
        bairro: data.bairro,
        cep: data.cep,
        telfixo: data.telefone,
        telcel: data.celular,
        email: data.email,
        localidade: data.cidade,
        logradouro: data.logradouro,
        razaoSocial: data.nome,
        numero: data.numero,
        uf: data.estado,
      }
      setResult(mapObject)
    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    if (companyId) {
      fetchCompany()
    }
  }, [companyId])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormBody
        formData={formData}
        dataBaseInfo={result}
        saveFunc={saveFunc}
      />
    </DashboardLayout >
  );
}

export default Form;
