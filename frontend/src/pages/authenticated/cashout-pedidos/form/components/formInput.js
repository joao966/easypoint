import React, { useState } from 'react';

// Soft UI Dashboard React components
import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Grid from '@mui/material/Grid';
import InputMask from "react-input-mask";
import CurrencyInput from 'react-currency-input';

import CepInput from './cepInput'
import SelectInput from './selectInput'

function FormInput({ inputConfig, formik, requestsData }) {
  const input = (inputConfig, formik) => {
    if (!inputConfig.type) {
      return <></>
    }

    switch (inputConfig.type) {
      case 'password': return (
        <SuiInput
          id={inputConfig.name}
          type={inputConfig.type}
          name={inputConfig.name}
          placeholder={inputConfig.placeHolder}
          value={formik.values[inputConfig.name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          readOnly={!inputConfig.editable}
          sx={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? { borderColor: 'red' } : {}}
          title={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? formik.errors[inputConfig.name] : ''}
        />
      )
      case 'cep': return (
        <CepInput
          value={formik.values[inputConfig.name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled={!inputConfig.editable}
          id={inputConfig.name}
          type={inputConfig.type}
          name={inputConfig.name}
          placeholder={inputConfig.placeHolder}
          formikValues={formik.values}
          touched={formik.touched}
          errors={formik.errors}
          requestsData={requestsData}
        />
      )

      case 'currency': return (
        <SuiBox
          className={'MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary  css-10tpeui-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root'}
          sx={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? { borderColor: 'red' } : {}}
        >
          <CurrencyInput
            id={inputConfig.name}
            name={inputConfig.name}
            value={formik.values[inputConfig.name]}
            onBlur={formik.handleBlur}
            onChangeEvent={formik.handleChange}
            readOnly={!inputConfig.editable}
            thousandSeparator={inputConfig.config?.thousandSeparator || "."}
            decimalSeparator={inputConfig.config?.decimalSeparator || ","}
            precision={inputConfig.config?.precision || "2"}
            prefix={inputConfig.config?.prefix || ''}
            suffix={inputConfig.config?.suffix || ''}
            className={'MuiInputBase-input MuiInputBase-input css-k0nm2w-MuiInputBase-input'}
            title={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? formik.errors[inputConfig.name] : ''}
          />
        </SuiBox>
      )

      case 'select': return (
        <SelectInput
          value={formik.values[inputConfig.name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled={!inputConfig.editable}
          id={inputConfig.name}
          type={inputConfig.type}
          name={inputConfig.name}
          placeholder={inputConfig.placeHolder}
          formikValues={formik.values}
          touched={formik.touched}
          errors={formik.errors}
          requestsData={requestsData}
          config={inputConfig.config}
        />
      )

      case 'mask': return (
        <InputMask
          mask={(!inputConfig.config.mask || typeof inputConfig.config.mask === 'string') ? inputConfig.config.mask : inputConfig.config.mask(formik.values[inputConfig.name])}
          maskChar={null}
          value={formik.values[inputConfig.name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled={!inputConfig.editable}
          formatChars={{
            '9': '[0-9]',
            'a': '[A-Za-z]',
            'A': '[A-Z]',
            'z': '[a-z]',
            '*': '[A-Za-z0-9]',
          }}
        >
          {() => (
            <SuiInput
              id={inputConfig.name}
              type={inputConfig.type}
              name={inputConfig.name}
              placeholder={inputConfig.placeHolder}
              sx={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? { borderColor: 'red' } : {}}
              title={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? formik.errors[inputConfig.name] : ''}
            />
          )}
        </InputMask>
      )

      default: return (
        <SuiInput
          id={inputConfig.name}
          type={inputConfig.type}
          name={inputConfig.name}
          placeholder={inputConfig.placeHolder}
          value={formik.values[inputConfig.name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          readOnly={!inputConfig.editable}
          sx={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? { borderColor: 'red' } : {}}
          title={(formik.touched[inputConfig.name] && formik.errors[inputConfig.name]) ? formik.errors[inputConfig.name] : ''}
          multiline={inputConfig.config?.multiline}
        />
      )
    }
  }

  return (
    <>
      <Grid
        item
        xs={12}
        md={inputConfig.config.inputSize || 1}
        key={'gridInput_' + inputConfig.id}
      >
        <SuiTypography
          variant="caption"
          fontWeight="medium"
        >
          {inputConfig.label}
        </SuiTypography>
        {
          input(inputConfig, formik)
        }
      </Grid>
      {
        (inputConfig.config?.offset) ?
          <Grid item xs={0} md={inputConfig.config?.offset} />
          : <></>
      }
    </>
  )
}

export default FormInput