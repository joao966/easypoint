import { useState } from "react";

import useAuth from "context/useAuth";

import { useNavigate, useLocation } from "react-router-dom";

import { Formik } from 'formik';
import * as Yup from 'yup';


// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import InputMask from "react-input-mask";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "../components/CoverLayout";

// Imgs 
import logoEmpresa from 'assets/images/logoEmpresa/logoBlue.jpeg'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Email não informado'),
});

function SignIn() {
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();

  const showError = (err) => {
    setLoginError('')
    setTimeout(() => {
      setLoginError(err)
    }, 200)
  }

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
          Resetar Senha
        </SuiTypography>
        <Formik
          enableReinitialize={true}
          initialValues={{ cpf: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            try {
              showError('Houve uma falha no envio de e-mail')
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
            isSubmitting,
            setFieldTouched,
          }) => (
            <SuiBox component="form" role="form" onSubmit={handleSubmit}>
              <SuiBox mb={2}>
                <SuiBox mb={1} ml={0.5}>
                  <SuiTypography component="p" variant="caption" color="text">
                    Digite seu CPF de recuperação
                  </SuiTypography>
                </SuiBox>
                <InputMask
                  mask={'999.999.999-99'}
                  maskChar={null}
                  value={values['cpf']}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={false}
                >
                  {
                    () => (
                      <SuiInput
                        id={'cpf'}
                        type={'text'}
                        name={'cpf'}
                        placeholder={'000.000.000-00'}
                        sx={(touched['cpf'] && errors['cpf']) ? { borderColor: 'red' } : {}}
                        title={(touched['cpf'] && errors['cpf']) ? errors['cpf'] : ''}
                      />
                    )
                  }
                </InputMask>
              </SuiBox>
              <SuiBox mt={4} mb={1} sx={{ display: 'flex', justfyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <SuiButton type="submit" variant="gradient" color="info" fullWidth>
                  Enviar e-mail de recuperação
                </SuiButton>
                <SuiTypography variant="button" color="text" fontWeight="regular" sx={{ color: 'red', padding: 1, height: '1rem' }}>
                  {loginError || ''}
                </SuiTypography>
              </SuiBox>
              <SuiBox mt={3} textAlign="center">
                <SuiTypography variant="button" color="text" fontWeight="regular">
                  Voltar para o Login?{" "}
                  <SuiTypography
                    component={Link}
                    to="/login"
                    variant="button"
                    color="secondary"
                    fontWeight="medium"
                    textGradient
                  >
                    Logar
                  </SuiTypography>
                </SuiTypography>
              </SuiBox>
            </SuiBox>
          )}
        </Formik>
      </Card>
    </CoverLayout>
  );
}

export default SignIn;
