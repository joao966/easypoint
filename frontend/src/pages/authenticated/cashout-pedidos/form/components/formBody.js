import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

// @mui material components
import Grid from '@mui/material/Grid';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';

import createYupSchema from 'utils/createYupSchema';

// Custom components
import HeaderTitle from './headerTitle';
import FormSection from './formSection';

// Custom styles for the Form
import { formGrid } from '../styles/form';

const FormBody = ({ formData, dataBaseInfo, saveFunc, handleClose }) => {
  const [inputs, setInputs] = useState(null);
  const [validateSchema, setValidateSchema] = useState();

  useEffect(() => {
    const inputs = {};
    let schema = createYupSchema({}, {});
    formData.sections.forEach((section) => {
      section.fields.forEach((input) => {
        inputs[input.name] = dataBaseInfo[input.name] || input.defaultValue || '';
        if (input.validationEdit && Object.keys(dataBaseInfo).length > 0) {
          schema = createYupSchema(schema, {
            id: input.name,
            validationType: input.type == 'number' ? 'number' : 'string',
            validations: input.validationEdit,
          });
        } else if (Object.keys(input).length > 0 && input.type == 'select') {
          schema = createYupSchema(schema, {
            id: input.name,
            validationType: 'string',
            validations: input.validation,
          });
        } else if (Object.keys(input).length > 0) {
          schema = createYupSchema(schema, {
            id: input.name,
            validationType: input.type == 'number' ? 'number' : 'string',
            validations: input.validation,
          });
        }
      });
    });

    setValidateSchema(yup.object().shape(schema));
    setInputs(inputs);
  }, [formData, dataBaseInfo]);

  return inputs ? (
    <Formik
      enableReinitialize={true}
      initialValues={inputs}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        saveFunc(values);
      }}
      key={'formik' + formData.id}
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
        resetForm,
      }) =>
        formData ? (
          <SuiBox key={'SuiBox' + formData.id}>
            <HeaderTitle title={formData.title} type={1} key={'headerTitle' + formData.id} />
            {formData.sections.length > 0 ? (
              <SuiBox component="form" role="form" key={formData.id} onSubmit={handleSubmit}>
                <FormSection
                  sections={formData.sections}
                  formik={{
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldTouched,
                  }}
                  key={'formSection' + formData.id}
                />
                {formData.buttons.length > 0 ? (
                  <Grid
                    sx={() => formGrid()}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    key={'buttonGrid' + formData.id}
                  >
                    {formData.buttons.map((e) => (
                      <Grid item key={'buttonGrid_' + e.id}>
                        <SuiButton
                          type={e.type}
                          onClick={() => {
                            if (e.type === 'reset') {
                              resetForm();
                              handleClose();
                              return;
                            }
                          }}
                          disabled={isSubmitting}
                          color={e?.config?.color}
                          key={'button_' + e.id}
                        >
                          {e.label}
                        </SuiButton>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <></>
                )}
              </SuiBox>
            ) : (
              <></>
            )}
          </SuiBox>
        ) : (
          <></>
        )
      }
    </Formik>
  ) : (
    <></>
  );
};

export default FormBody;
