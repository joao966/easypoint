import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Soft UI Dashboard React components
import InputMask from "react-input-mask";
import SuiInput from "components/SuiInput";



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
  requestsData,
}) {

  const [cepRequested, setCepRequested] = useState(null)

  useEffect(() => {
    if (value.length === 9 && value !== cepRequested) {
      setCepRequested(value.replace('-', ''))
    }
  }, [value])

  const fetchCEP = async () => {
    axios.get(`https://viacep.com.br/ws/${cepRequested}/json/`).then(({ data }) => {
      if (data && formikValues) {
        for (let item in data) {
          if (Object.keys(formikValues).includes(item) && formikValues[item] === '') {
            formikValues[item] = data[item]
          }
        }

        const requests = requestsData()
        requests[id] = data
        requestsData(requests)
      }
    }).catch((err) => { console.error(err) })
  }

  useEffect(() => {
    if (cepRequested) {
      fetchCEP()
    }
  }, [cepRequested])

  return (
    <InputMask
      mask={'99999-999'}
      maskChar={null}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      disabled={disabled}
    >
      {
        () => (
          <SuiInput
            id={id}
            name={name}
            placeholder={placeholder}
            sx={(touched[name] && errors[name]) ? { borderColor: 'red' } : {}}
            title={(touched[name] && errors[name]) ? errors[name] : ''}
          />
        )
      }
    </InputMask>
  )
}

export default HeaderTitle