

import { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Formik } from 'formik';
import * as yup from 'yup';

import useAuth from "context/useAuth";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "pages/unauthenticated/components/CoverLayout";

// Imgs 
import logoEmpresa from 'assets/images/logoEmpresa/logoBlue.jpeg'

import createYupSchema from 'utils/createYupSchema';

const validations = [
  {
    id: 'password',
    validationType: 'string',
    validations: [
      {
        type: "required",
        params: ["Campo senha obrigatório"]
      },
      {
        type: "min",
        params: [5, "Senha deve conter no minimo 5 caracteres"]
      },
      {
        type: "minLowercase",
        params: [1, "Senha deve conter no minimo 1 letra minuscula"]
      },
      {
        type: "minUppercase",
        params: [1, "Senha deve conter no minimo 1 letra maiuscula"]
      },
      {
        type: "minSymbols",
        params: [1, "Senha deve conter no minimo 1 caracter especial"]
      },
    ]
  },
  {
    id: 'confirmpassword',
    validationType: 'string',
    validations: [
      {
        type: "required",
        params: ["Campo confirmar senha obrigatório"]
      },
      {
        type: "equalTo",
        params: ['password', 'Valor deve ser o mesmo do campo senha']
      },
    ]
  },
]

function FirstLogin() {
  const [loginError, setLoginError] = useState();
  const [validateSchema, setValidateSchema] = useState();
  const navigate = useNavigate();
  const { changePassword } = useAuth()

  const showError = (err) => {
    setLoginError('')
    setTimeout(() => {
      setLoginError(err)
    }, 200)
  }

  useEffect(() => {
    setValidateSchema(yup.object().shape(
      validations.map(e => {
        createYupSchema(createYupSchema, e)
      })
    ))
  }, [])

  return (
    <CoverLayout top={'23%'}>
      <SuiBox
        component="img"
        src={logoEmpresa}
        alt="logo empresa"
        sx={{
          width: "100%",
          height: "auto",
          padding: 2,
        }}
      />
      <Card sx={{ padding: 3 }}>
        <SuiTypography variant="h4" color="text" fontWeight="regular" textAlign="center" m={4}>
          Primeiro Login
        </SuiTypography>
        <Formik
          initialValues={{ password: '', confirmpassword: '' }}
          enableReinitialize={true}
          validationSchema={validateSchema}
          onSubmit={(values, { setSubmitting }) => {
            try {
              changePassword(values.password, values.confirmpassword).then(data=>{
                navigate("/")
              })
            } catch (err) {
              showError('Houve um problema, contate o administrador')
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <SuiBox component="form" role="form" onSubmit={handleSubmit}>
              <SuiBox mb={2}>
                <SuiBox mb={1} ml={0.5}>
                  <SuiTypography component="p" variant="caption" color="text">
                    Para continuar vamos criar uma senha nova:
                  </SuiTypography>
                </SuiBox>
                <SuiInput
                  type="password"
                  placeholder="Senha"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values['password']}
                  name={'password'}
                  id={'password'}
                  sx={(touched.password && errors.password) ? { borderColor: 'red' } : {}}
                  title={(touched.password && errors.password) ? errors.password : ''}
                />
              </SuiBox>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="p" variant="caption" color="text">
                  Confirmar senha:
                </SuiTypography>
                <SuiInput
                  type="password"
                  placeholder="Confirmar senha"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values['confirmpassword']}
                  name={'confirmpassword'}
                  id={'confirmpassword'}
                  sx={(touched.confirmpassword && errors.confirmpassword) ? { borderColor: 'red' } : {}}
                  title={(touched.confirmpassword && errors.confirmpassword) ? errors.confirmpassword : ''}
                />
              </SuiBox>
              <SuiBox mt={4} mb={1} sx={{ display: 'flex', justfyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <SuiButton type="submit" variant="gradient" color="info" fullWidth>
                  Alterar Senha
                </SuiButton>
                <SuiTypography variant="button" color="text" fontWeight="regular" sx={{ color: 'red', padding: 1, height: '1rem' }}>
                  {loginError || ''}
                </SuiTypography>
              </SuiBox>
            </SuiBox>
          )}
        </Formik>
      </Card>
    </CoverLayout>
  );
}

export default FirstLogin;
