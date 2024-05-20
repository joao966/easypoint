import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

// @mui material components
import { Card, Button, Icon } from '@mui/material';

import { getClosed } from 'services/closed.service';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Table from 'components/Tables/Table';

// Utils
import { cnpjFormater, numberToString } from 'utils/mask';

function Tables() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [makeRequest, setMakeRequest] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const columns = [
    { name: 'Id lançamento', align: 'start' },
    { name: 'Data', align: 'start' },
    { name: 'Descrição', align: 'center' },
    { name: 'Valor', align: 'center' },
    // { name: "Historico", align: "center" }
  ];

  const createRows = (data) => {
    const createrows =
      data.length > 0
        ? data.map((e) => {
            return {
              'Id lançamento': (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {e.id}
                </SuiTypography>
              ),
              Data: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {new Date(e.dtCriacao).toLocaleDateString()}
                </SuiTypography>
              ),
              Descrição: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {cnpjFormater(e.descricao)}
                </SuiTypography>
              ),
              Valor: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                  {numberToString(e.valor)}
                </SuiTypography>
              ),
              // "Historico": (
              //   <>
              //     <Button>
              //       <Icon
              //       // onClick={() => { handleOpenDialog(e.id, e.status, e.nome) }}
              //       >
              //         historyIcon
              //       </Icon>
              //     </Button>
              //   </>
              // ),
            };
          })
        : [];
    setRows(createrows);
  };

  useEffect(() => {
    if (location.pathname == '/closed' && makeRequest) {
      getClosed()
        .then((data) => {
          console.log("data:", data)
          createRows(data);
          setMakeRequest(false);
        })
        .catch((err) => {
          setRows([]);
        });
    }
  }, [location, makeRequest]);

  return (
    <DashboardLayout>
      <DashboardNavbar showTitle={true} title={'Comandas - Fechadas'} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
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
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
