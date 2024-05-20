import React from 'react';


// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";

// Custom styles for the Form
import {
  formTitle,
  sectionTitle
} from '../styles/form'

function HeaderTitle(props) {
  const {
    title,
    type
  } = props

  return (
    <>
      {
        (title) ?
          <SuiTypography
            component={`h${type}`}
            variant={`header${type}`}
            sx={() => (type > 1) ? sectionTitle() : formTitle()}
          >
            {title}
          </SuiTypography>
          : <></>
      }
    </>
  )
}

export default HeaderTitle