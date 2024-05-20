import React, { useState, useEffect } from 'react';

// Soft UI Dashboard React components
import InputMask from "react-input-mask";
import SuiInput from "components/SuiInput";
import { fetchCEP } from 'utils/getCep';

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
  placeholder
}) {

  const [cepRequested, setCepRequested] = useState(null)

  useEffect(() => {
    if (value.length === 9 && value !== cepRequested) {
      setCepRequested(value.replace('-', ''))
    }
  }, [value])

  useEffect(() => {
    const getCep = async () => {
      if (cepRequested) {
        await fetchCEP(cepRequested, formikValues)
      }
    };
    getCep();
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