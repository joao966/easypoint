import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Soft UI Dashboard React components
import InputMask from 'react-input-mask';
import SuiInput from 'components/SuiInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { findAll } from 'services/carteira.service';

function styleInput(error) {
  const style = {
    '.MuiSelect-select': {
      width: '100% !important',
      display: 'block',
    },
  };
  if (error) style['borderColor'] = 'red';
  return style;
}

function HeaderTitle({
  value,
  onBlur,
  onChange,
  disabled,
  touched,
  errors,
  formikValues,
  id,
  name,
  placeholder,
  inputConfig,
  requestsData,
}) {
  const [dataBase, setDataBase] = useState([]);

  const fetchEmpresas = async () => {
    findAll().then((data) => {
      setDataBase(data);
      const requests = requestsData();
      requests[id] = data;
      requestsData(requests);
    });
  };

  useEffect(() => {
    if (dataBase.length <= 0) {
      fetchEmpresas();
    }
  }, [dataBase]);

  const renderItens = () => {
    return dataBase.map((e) => {
      return (
        <MenuItem value={e.id} key={e.id}>
          {e.empresa?.nome}
        </MenuItem>
      );
    });
  };

  return (
    <Select
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      sx={styleInput(touched[name] && errors[name])}
      title={touched[name] && errors[name] ? errors[name] : ''}
    >
      <MenuItem disabled>Selecione uma opção</MenuItem>
      {renderItens()}
    </Select>
  );
}

export default HeaderTitle;
