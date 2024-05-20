import React, { useState, useEffect } from 'react';

// Soft UI Dashboard React components
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

function HeaderTitle({ value, onBlur, onChange, disabled, touched, errors, id, name, requestsData, config }) {
  const [dataBase, setDataBase] = useState([]);

  const fetchEmpresas = async () => {
    findAll().then((data) => {
      if (config.boolean) {
        setDataBase([
          { id: true, empresa: { nome: 'sim' } },
          { id: false, empresa: { nome: 'não' } },
        ]);
        return;
      }
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
        <MenuItem value={e?.empresa?.documento} key={e.empresa?.nome}>
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
