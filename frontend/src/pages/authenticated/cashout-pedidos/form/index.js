import React, { useEffect, useState } from 'react';
// import { createObjectCsvWriter } from 'csv-writer';

// Data
import formJson from './data/form';
import Papa from 'papaparse';

// Custom components
import FormBody from './components/formBody';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
// import { formatNumberToBRL } from 'utils/mask';

function Form({ handleClose, rows, id, edit, setDatasetUpload, setDisabled }) {
  const [formData, setFormData] = useState(formJson);
  const [type, setType] = useState('new');
  const [result, setResult] = useState({});

  useEffect(() => {
    if (edit) {
      rows.forEach((row, i) => {
        if (i === id) {
          const mapObject = {
            documentId: row['documentId'],
            telephone: row['telephone'],
            externalIdentifier: row['externalIdentifier'],
            amount: row['amount'],
            email: row['email'],
            description: row['description'],
          };
          setResult(mapObject);
          return;
        }
      });
    }
  }, []);

  const formatNumberToBRL = (numStr) => {
    const numberFixed = parseFloat(String(numStr / 100)).toFixed(2);
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
      .format(+numberFixed)
      .slice(0, -2);
  };

  const saveFunc = async (values) => {
    values.telephone = values?.telephone.replace(/\D/g, '');
    const valor = values['amount'];
    values.amount = formatNumberToBRL(Number(valor.replace(/\D/g, '')));
    setDisabled(false);
    if (edit) {
      const rowsEdited = rows.map((row, i) => {
        if (i === id) {
          return { ...row, ...values };
        } else {
          return row;
        }
      });
      setDatasetUpload(rowsEdited);
      handleClose();
      return;
    }

    setDatasetUpload((prev) => [...prev, values]);
    handleClose();
  };

  return (
    <DashboardLayout>
      <FormBody
        handleClose={handleClose}
        formData={formData}
        dataBaseInfo={result}
        saveFunc={saveFunc}
        formType={type}
      />
    </DashboardLayout>
  );
}

export default Form;
