
import React, { useEffect, useState } from 'react'

import { useLocation, NavLink, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from "@mui/material/Icon";

import { getAllClients } from 'services/clientes.service'

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard React components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Table from "components/Tables/Table";

// Utils
import { telephoneFormater, cpfFormater } from 'utils/mask'


function Tables() {
  const [rows, setRows] = useState([])
  const [makeRequest, setMakeRequest] = useState(true)
  const [dialog, setDialog] = useState(false)
  const [dialogParams, setDialogParams] = useState()
  const location = useLocation();
  const navigate = useNavigate();

  const columns = [
    { name: "cpf", align: "left" },
    { name: "nome", align: "left" },
    { name: "cidade", align: "left" },
    { name: "chave pix", align: "center" },
    { name: "status", align: "center" },
    { name: "action", align: "center" },
  ]

  const handleOpenDialog = (userId, active, nome) => {
    setDialogParams({ userId, active, nome })
    setDialog(true)
  }

  const handleEdit = (id) => {
    navigate(`${location.pathname}/edit?id=${id}`);
  }

  const handleCloseDialog = (decision) => {
    const { userId, active } = dialogParams

    if (decision && active) {
      inactiveUser(userId).then((response) => {
        setMakeRequest(true)
      }).catch((err) => { console.error(err) })
      setDialog(false)
    } else if (decision && !active) {
      activeUser(userId).then((response) => {
        setMakeRequest(true)
      }).catch((err) => { console.error(err) })
      setDialog(false)
    }

    setDialog(false)
  }

  const createRows = (data) => {
    const createrows = (data.length > 0) ? data.map((e) => {
      return {
        cpf: (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {cpfFormater(e.cpf) || ""}
          </SuiTypography>
        ),
        nome: (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {e.nome || ""}
          </SuiTypography>
        ),
        cidade: (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {e.cidade || ""}
          </SuiTypography>
        ),
        'chave pix': (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {e.chavePix || ""}
          </SuiTypography>
        ),
        status: ((e.status) ?
          <SuiBadge variant="gradient" badgeContent="Ativo" color="success" size="xs" container />
          :
          <SuiBadge variant="gradient" badgeContent="Inativo" color="error" size="xs" container />),
        action: (
          <>
            <Button title="Editar" sx={{ textDecoration: 'none', color: 'inherit' }} onClick={() => { handleEdit(e.id) }}>
              <Icon>edit</Icon>
            </Button>
          </>
        ),
      }
    }) : []
    setRows(createrows)
  }

  useEffect(() => {
    const controller = new AbortController();

    if (location.pathname == '/clientes' && makeRequest) {
      getAllClients().then((data) => {
        createRows(data)
        setMakeRequest(false)
      }).catch(err => {
        setRows([])
      })
    }

    return () => {
      controller.abort();
    }
  }, [location, makeRequest])

  return (
    <DashboardLayout>
      <DashboardNavbar showTitle={true} title={'Clientes'} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <NavLink to={location.pathname + '/novo'}>
                <SuiButton color="info">
                  Adicionar Novo
                </SuiButton>
              </NavLink>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
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
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
