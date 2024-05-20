import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { createOpenLancamento } from 'services/open.service';

// Data
import formJson from './data/form';

// Custom components
import FormBody from './components/formBody';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';

function Form(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(formJson);
  const [result, setResult] = useState({});
  const [requestsData, setRequestsData] = useState({});
  // view, edit, new
  const [type, setType] = useState('new');

  const saveFunc = (values) => {
    values.status = 'open';
    return new Promise((res, rej) => {
      createOpenLancamento(values)
        .then(() => res())
        .catch((err) => rej(err));
    });
  };

  const handleRequests = (addData) => {
    if (!addData) {
      return requestsData;
    } else {
      setRequestsData(addData);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormBody
        formData={formData}
        dataBaseInfo={result}
        saveFunc={saveFunc}
        formType={type}
        requestsData={handleRequests}
      />
    </DashboardLayout>
  );
}

export default Form;
