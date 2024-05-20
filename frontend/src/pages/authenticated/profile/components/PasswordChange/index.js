

import { useState, useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from "yup";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Grid from '@mui/material/Grid';
import SuiButton from "components/SuiButton";

import { editUser } from 'services/usuarios.service'

function PasswordChange({ user }) {
  const [validateSchema, setValidateSchema] = useState()

  useEffect(() => {
    const changePasswordSchema = Yup.object().shape({
      password: Yup.string(),
      confirmPassword: Yup.string(),
    });

    setValidateSchema(changePasswordSchema)
  }, [])

  return (
    <Card>
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Mudar senha
        </SuiTypography>
      </SuiBox>
      <SuiBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <Formik
          enableReinitialize={true}
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validateSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const mapObject = {}
            mapObject['dtAtualizacao'] = new Date().toISOString()
            mapObject['senha'] = values.password
            mapObject['id'] = user.id
            editUser(mapObject).then(() => { resetForm() }).catch(err => console.log(err))
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
            resetForm
          }) => (
            <SuiBox component="form" role="form" onSubmit={handleSubmit}>
              <Grid
                item
                xs={12}
              >
                <SuiTypography
                  variant="caption"
                  fontWeight="medium"
                >
                  Nova senha:
                </SuiTypography>
                <SuiInput
                  id={'password'}
                  type={'password'}
                  name={'password'}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={(touched['password'] && errors['password']) ? { borderColor: 'red' } : {}}
                  title={(touched['password'] && errors['password']) ? errors['password'] : ''}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <SuiTypography
                  variant="caption"
                  fontWeight="medium"
                >
                  Confirmar Senha:
                </SuiTypography>
                <SuiInput
                  id={'confirmPassword'}
                  type={'password'}
                  name={'confirmPassword'}
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={(touched['confirmPassword'] && errors['confirmPassword']) ? { borderColor: 'red' } : {}}
                  title={(touched['confirmPassword'] && errors['confirmPassword']) ? errors['confirmPassword'] : ''}
                />
              </Grid>
              <Grid item sx={{ marginTop: 2 }}>
                <SuiButton type="submit" disabled={isSubmitting} color={'success'} sx={{ marginRight: 2 }}>
                  Confirmar
                </SuiButton>
                <SuiButton type="button" color={'error'} onClick={resetForm}>
                  Cancelar
                </SuiButton>
              </Grid>
            </SuiBox>
          )}
        </Formik>
      </SuiBox>
    </Card>
  );
}

export default PasswordChange;
