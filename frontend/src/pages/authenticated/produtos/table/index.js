import React, { useEffect, useState } from 'react';

import { useLocation, NavLink, useNavigate } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';

import { getAllProducts } from 'services/produto.service';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';
import SuiBadge from 'components/SuiBadge';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Table from 'components/Tables/Table';

// Utils
import { telephoneFormater, cnpjFormater, numberToString } from 'utils/mask';

function Tables() {
  const [rows, setRows] = useState([]);
  const [makeRequest, setMakeRequest] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [dialogParams, setDialogParams] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const columns = [
    { name: 'nome', align: 'left' },
    { name: 'preço', align: 'left' },
    { name: 'categoria', align: 'left' },
    { name: 'quantidade', align: 'center' },
    { name: 'imagem', align: 'center' },
    { name: 'action', align: 'center' },
  ];

  const handleOpenDialog = (userId, active, nome) => {
    setDialogParams({ userId, active, nome });
    setDialog(true);
  };

  const handleEdit = (id) => {
    navigate(`${location.pathname}/edit?id=${id}`);
  };

  const handleCloseDialog = (decision) => {
    const { userId, active } = dialogParams;

    if (decision && active) {
      // inactiveCompany(userId).then((response) => {
      //   setMakeRequest(true)
      // }).catch((err) => { console.error(err) })
      setDialog(false);
    } else if (decision && !active) {
      // activeCompany(userId).then((response) => {
      //   setMakeRequest(true)
      // }).catch((err) => { console.error(err) })
      setDialog(false);
    }

    setDialog(false);
  };

  const createRows = (data) => {
    const createrows =
      data.length > 0
        ? data.map((e) => {
            console.log("e:", e)
            return {
              nome: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {e?.name}
                </SuiTypography>
              ),
              preço: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {e?.price}
                </SuiTypography>
              ),
              categoria: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {e?.category}
                </SuiTypography>
              ),
              quantidade: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {e?.quantity}
                </SuiTypography>
              ),
              imagem: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  <img src={e?.imageUrl} width='40px' height='40px' />
                </SuiTypography>
              ),
              action: (
                <>
                  <Button
                    title="Editar"
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={() => {
                      handleEdit(e.id);
                    }}
                  >
                    <Icon>edit</Icon>
                  </Button>
                  {/* <Button title={(e.status) ? 'Inativar' : 'Ativar'}>
              <Icon
                sx={() => (e.status) ? { color: 'gray' } : { color: 'red' }}
                onClick={() => { handleOpenDialog(e.id, e.status, e.nome) }}
              >
                blockIcon
              </Icon>
            </Button> */}
                </>
              ),
              saldo: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {numberToString(e.saldo)}
                </SuiTypography>
              ),
            };
          })
        : [];
    setRows(createrows);
  };

  const renderDialog = (params = { active: true, nome: '' }) => {
    const { active, nome } = params;

    return (
      <Dialog
        open={dialog}
        onClose={() => {
          handleCloseDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {active ? `Deseja desativar a empresa "${nome}" ?` : `Deseja ativar a empresa "${nome}" ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {active ? `Deseja continuar com a desativação?` : `Deseja continuar com a ativação?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog(true);
            }}
            autoFocus
          >
            Concordo
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    if (location.pathname == '/produtos' && makeRequest) {
      getAllProducts()
        .then((data) => {
          console.log("data:", data)
          createRows(data);
          setMakeRequest(false);
        })
        .catch((err) => {
          setRows([]);
        });
    }

    return () => {
      controller.abort();
    };
  }, [location, makeRequest]);

  return (
    <DashboardLayout>
      <DashboardNavbar showTitle={true} title={'Produtos'} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <NavLink to={location.pathname + '/novo'}>
                <SuiButton color="info">Adicionar Novo</SuiButton>
              </NavLink>
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
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        {renderDialog(dialogParams)}
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
