import { useState } from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import useAuth from 'context/useAuth';

import Card from '@mui/material/Card';
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiInput from 'components/SuiInput';
import InputMask from 'react-input-mask';
import SuiButton from 'components/SuiButton';
import CoverLayout from '../components/CoverLayout';

import { stringToNumber } from 'utils/mask';

// Imgs
import logoEmpresa from 'assets/images/logos/logo_sm.jpeg';

const SignupSchema = Yup.object().shape({
  cpf: Yup.string().required('CPF não informado'),
  password: Yup.string().required('Senha não informada'),
});

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const showError = (err) => {
    setLoginError('');
    setTimeout(() => {
      setLoginError(err);
    }, 200);
  };

  return (
    <CoverLayout top={'23%'}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <SuiBox
          component="img"
          src={logoEmpresa}
          alt="logo empresa"
          sx={{
            width: 180,
            height: 100,
            padding: 2,
          }}
        /> */}
        LOGO DA EMPRESA
      </div>
      <Card sx={{ padding: 3 }}>
        <Formik
          enableReinitialize={true}
          initialValues={{ cpf: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { cpf, password } = values;
            const number = cpf.replace(/[^0-9]/g, '');
            try {
              login(number, password)
                .then((data) => {
                  if (data && data.status == 'P') {
                    navigate('/firstLogin');
                  } else {
                    navigate(state?.path || '/');
                  }
                })
                .catch((err) => {
                  showError('CPF ou senha errados');
                });
            } catch (err) {
              showError('Houve um problema, contate o administrador');
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <SuiBox component="form" role="form" onSubmit={handleSubmit}>
              <SuiBox mb={2}>
                <SuiBox mb={1} ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    CPF
                  </SuiTypography>
                </SuiBox>
                <InputMask
                  mask={'999.999.999-99'}
                  maskChar={null}
                  value={values['cpf']}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={false}
                  type='number'
                >
                  {() => (
                    <SuiInput
                      id={'cpf'}
                      type={'text'}
                      name={'cpf'}
                      placeholder={'000.000.000-00'}
                      sx={touched['cpf'] && errors['cpf'] ? { borderColor: 'red' } : {}}
                      title={touched['cpf'] && errors['cpf'] ? errors['cpf'] : ''}
                    />
                  )}
                </InputMask>
              </SuiBox>
              <SuiBox mb={2}>
                <SuiBox mb={1} ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    Senha
                  </SuiTypography>
                </SuiBox>
                <SuiInput
                  title={touched.password && errors.password ? errors.password : ''}
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values['password']}
                  name={'password'}
                  id={'password'}
                  sx={touched.password && errors.password ? { borderColor: 'red' } : {}}
                />
              </SuiBox>
              <SuiBox
                mt={4}
                mb={1}
                sx={{
                  display: 'flex',
                  justfyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
                <SuiButton type="submit" variant="gradient" color="info" fullWidth>
                  Entrar
                </SuiButton>
                <SuiTypography
                  variant="button"
                  color="text"
                  fontWeight="regular"
                  sx={{ color: 'red', padding: 1, height: '1rem' }}
                >
                  {loginError || ''}
                </SuiTypography>
              </SuiBox>
              <SuiBox mt={3} textAlign="center">
                <SuiTypography variant="button" color="text" fontWeight="regular">
                  Esqueceu a senha?{' '}
                  <SuiTypography
                    component={Link}
                    to="/resetpassword"
                    variant="button"
                    color="secondary"
                    fontWeight="medium"
                    textGradient
                  >
                    Trocar Senha
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
