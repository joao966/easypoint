import React from 'react';

// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';

// Custom components
import HeaderTitle from './headerTitle'
import FormInput from './formInput'

// Custom styles for the Form
import {
  formGrid,
  formCard
} from '../styles/form'

function FormSection(props) {
  const {
    sections,
  } = props

  return (
    <>
      {sections.map((section) => (
        <Card sx={() => formCard()} key={'sectionCard_'+section.id}>
          <HeaderTitle title={section.title} type={3} key={'headerSection_'+section.id}/>
          <Grid
            sx={() => formGrid()}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            key={'sectionGrid_'+section.id}
          >
            {section.fields.map((input) => (
              <FormInput inputConfig={input} {...props}
              key={input.id}
              />
            ))}
          </Grid>
        </Card>
      ))}
    </>
  )
}

export default FormSection