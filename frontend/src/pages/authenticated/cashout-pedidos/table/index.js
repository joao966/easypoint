import React, { useEffect, useState } from 'react';

// @mui material components
import { Card, Checkbox, Alert, CircularProgress } from '@mui/material';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Table from 'components/Tables/TableCashout';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Services
import ModalForm from './components/Modal';
import ModalErrors from './components/ModalErrors';
import { addLancamento, addCsv } from 'services/cashout.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ModalSuccess from './components/ModalSuccess';

function Tables() {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loadingFinalizar, setLoadingFinalizar] = React.useState(false);
  const [loadingNewFile, setLoadingNewFile] = React.useState(false);
  const [errorAme, setErrorAme] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [datasetUpload, setDatasetUpload] = useState([]);
  const [dataErros, setDataErros] = useState([]);
  const [dataSucces, setDataSuccess] = useState([]);
  const [dataCheckedState, setDataCheckedState] = useState([]);
  const [excel, setExcel] = useState([]);

  const handleCheckAll = ({ target }) => {
    if (target.checked) {
      setCheckAll(true);
      setDataCheckedState(datasetUpload);
    }
    if (!target.checked) {
      setCheckAll(false);
      setDataCheckedState([]);
    }
  };

  const columns = [
    { label: <Checkbox checked={checkAll} onClick={handleCheckAll} />, name: 'checkbox', align: 'center' },
    { label: 'cnpj ou cpf', name: 'documentId', align: 'left' },
    { label: 'descrição', name: 'description', align: 'left' },
    { label: 'valor', name: 'amount', align: 'center' },
    { label: 'telefone', name: 'telephone', align: 'center' },
    { label: 'email', name: 'email', align: 'center' },
    // { label: 'identificador externo', name: 'externalIdentifier', align: 'center' },
    { label: 'editar', name: 'edit', align: 'center' },
  ];

  const handlePost = async (datasetUpload) => {
    setLoadingFinalizar(true);
    const dataClone = datasetUpload.map((element) => ({
      ...element,
      amount: +element.amount.replace(/\D/g, ''),
    }));

    let withDrawInputs = [];
    dataClone.forEach((each) => {
      const { _edit, _checkbox, ...rest } = each;
      withDrawInputs.push(rest);
    });

    const response = await addLancamento(withDrawInputs);
    setLoadingFinalizar(false);
    if (response?.error) {
      setErrorAme(response?.message);
      setDataErros(response?.errors);
      setOpenError(true);
      setDatasetUpload([]);
      return;
    }

    setDatasetUpload([]);
    setSuccess(true);
    setDataSuccess(withDrawInputs);
    setCheckAll(false);
    return;
  };

  const changeHandler = async (event) => {
    setLoadingNewFile(true);
    const { success, errors } = await addCsv(event.target.files[0]);
    document.getElementById('uploadCaptureInputFile').value = '';
    setLoadingNewFile(false);
    if (errors?.length > 0) {
      setDatasetUpload([]);
      setDataErros(errors);
      setOpenError(true);
      return;
    }

    const novo = success.map((element) => ({
      ...element,
      amount: new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(element.amount),
    }));

    setDatasetUpload((old) => [...old, ...novo]);
  };

  useEffect(() => {
    createModelExelForDowload();
  }, []);

  const createModelExelForDowload = async () => {
    const excelData = [];
    excelData.push({
      CNPJ_CPF: '20429549000103',
      DESCRIÇÃO: 'debito de v',
      VALOR: '2.89',
      TELEFONE_CELULAR: '23232323232',
      EMAIL: 'p1ssed96@gmail.com',
      IDENTIFICAÇÃO_EXTERNA: '123',
    });

    setExcel(excelData);
  };

  const exportToXLS = (apiData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <DashboardLayout>
      {success && <ModalSuccess open={success} handleClose={setSuccess} rows={dataSucces} columns={columns} />}
      {openError && <ModalErrors open={openError} handleClose={setOpenError} dataErros={dataErros} />}
      <ModalForm
        rows={datasetUpload}
        setRows={setDatasetUpload}
        handleClose={handleClose}
        open={open}
        handleOpen={handleOpen}
        id={id}
        setId={setId}
        edit={edit}
        setEdit={setEdit}
        setDatasetUpload={setDatasetUpload}
        setDataErros={setDataErros}
        setOpenError={setOpenError}
        setDisabled={setLoadingFinalizar}
      />
      <DashboardNavbar showTitle={true} title={'Nova campanha'} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiBox
                style={{ columnGap: '15px', minWidth: 350, display: 'flex', justifyContent: 'space-between' }}
              >
                <SuiButton
                  onClick={() => {
                    setEdit(false);
                    handleOpen();
                    setDataCheckedState([]);
                  }}
                  color="info"
                  sx={{ padding: 0, width: '150px' }}
                >
                  Adicionar Campanha
                </SuiButton>
                <SuiButton disabled={loadingNewFile} sx={{ padding: 0, width: '150px' }}>
                  <label
                    style={{
                      cursor: 'pointer',
                      background: '#17c1e8',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '12px 12px',
                      fontFamily: 'roboto',
                      fontSize: '13px',
                      fontWeight: 700,
                      width: 'inherit',
                    }}
                    htmlFor="uploadCaptureInputFile"
                  >
                    {loadingNewFile ? (
                      <CircularProgress size={20} sx={{ width: '100%' }} />
                    ) : (
                      'ESCOLHER ARQUIVO'
                    )}
                    <input
                      disabled={loadingNewFile}
                      id="uploadCaptureInputFile"
                      hidden
                      type="file"
                      name="file"
                      accept=".xlsx"
                      onChange={changeHandler}
                    />
                  </label>
                </SuiButton>
                <SuiButton
                  disabled={loadingFinalizar}
                  style={success ? { columnGap: '10px' } : {}}
                  sx={{ padding: 0, width: '150px' }}
                  onClick={() => handlePost(dataCheckedState)}
                  color="info"
                >
                  {loadingFinalizar ? <CircularProgress size={20} /> : 'Finalizar'}
                </SuiButton>

                <a href="/example-new-order.xlsx" download>
                  <SuiButton
                    disabled={loadingFinalizar}
                    style={success ? { columnGap: '10px' } : {}}
                    sx={{ padding: 0, width: '150px', height: '100%' }}
                    color="info"
                    // onClick={() => {
                    //   console.log('clicou');
                    //   exportToXLS(excel, 'modelo de exel');
                    // }}
                  >
                    Modelo Excel
                  </SuiButton>
                </a>
              </SuiBox>
              <SuiBox>
                <SuiInput
                  type="search"
                  icon={{ component: <SearchIcon />, direction: 'left' }}
                  placeholder="Pesquisar"
                />
              </SuiBox>
            </SuiBox>
            <SuiBox
              sx={{
                '& .MuiTableRow-root:not(:last-child)': {
                  '& td': {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table
                columns={columns}
                rows={datasetUpload}
                handleOpen={handleOpen}
                setId={setId}
                setEdit={setEdit}
                setDataCheckedState={setDataCheckedState}
                dataCheckedState={dataCheckedState}
                checkAll={checkAll}
                setCheckAll={setCheckAll}
              />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
