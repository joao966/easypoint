import React, { useEffect, useState } from 'react';

import { useLocation, NavLink, useNavigate } from 'react-router-dom';

// @mui material components
import {
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Menu,
} from '@mui/material';

import { getAllOrdersOpen } from 'services/open.service';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';
import SuiInput from 'components/SuiInput';
import SuiBadge from 'components/SuiBadge';
import ActionButton from './components/actions';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Table from 'components/Tables/Table';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Utils
import { telephoneFormater, cnpjFormater, numberToString } from 'utils/mask';

function Tables() {
  const [tableData, setTableData] = useState();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState();
  const [makeRequest, setMakeRequest] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const STATUS = {
    open: 'Aberto',
    closed: 'Fechado'
  };

  const columns = [
    { name: 'id transação', align: 'left' },
    { name: 'descrição', align: 'left' },
    { name: 'status', align: 'left' },
    { name: 'data transação', align: 'center' },
    { name: 'valor', align: 'center' },
    // { name: "status", align: "center" },
    { name: 'action', align: 'center' },
  ];

  const handleSearch = (el) => {
    const value = el.target.value;
    if (value.length > 3) {
      const filterData = tableData.filter((e) => {
        if (
          e.id.includes(value) ||
          e.carteira?.empresa?.nome.includes(value) ||
          e.carteira?.empresa?.documento.includes(value) ||
          cnpjFormater(e.carteira?.empresa?.documento).includes(value) ||
          numberToString(e.valor).includes(value)
        ) {
          return true;
        }
      });
      createRows(filterData);
    } else {
      createRows(tableData);
    }
    setSearch(value);
  };

  const createRows = (data) => {
    const createrows = data.map((e) => {
      return {
        'id transação': (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {e.id}
          </SuiTypography>
        ),
        descrição: (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {e.descricao}
          </SuiTypography>
        ),
        status: (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {STATUS[e.status]}
          </SuiTypography>
        ),
        'data transação': (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {new Date(e.dtCriacao).toLocaleDateString()}
          </SuiTypography>
        ),
        valor: (
          <SuiTypography variant="caption" color="secondary" fontWeight="medium">
            {numberToString(e.valor_total)}
          </SuiTypography>
        ),
        // 'status': (
        //   <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        //     {
        //       STATUS[e.status]
        //     }
        //   </SuiTypography>
        // ),
        action: <ActionButton id={e.id} makeRequest={setMakeRequest} status={e.status} navigate={navigate} rest={e} />,
      };
    });
    setRows(createrows);
  };

  useEffect(() => {
    if (location.pathname == '/lancamento' && makeRequest) {
      getAllOrdersOpen()
        .then((data) => {
          createRows(data);
          setTableData(data);
          setMakeRequest(false);
        })
        .catch((err) => {
          setRows([]);
        });
    }
  }, [location, makeRequest]);

  return (
    <DashboardLayout>
      <DashboardNavbar showTitle={true} title={'Comandas - Abertas'} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <NavLink to={location.pathname + '/novo'}>
                <SuiButton color="info">Adicionar Novo</SuiButton>
              </NavLink>
              <SuiBox>
                <SuiInput
                  type="search"
                  value={search}
                  onChange={handleSearch}
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
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
