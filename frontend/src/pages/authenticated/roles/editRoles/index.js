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

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

import { getAllCompanys } from 'services/produto.service';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';
import SuiBadge from 'components/SuiBadge';

// Soft UI Dashboard React components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';

import { getAllRoles, updateRole } from 'services/roles.service';

import * as style from './style';
import { cnpjFormater } from 'utils/mask';

function Roles() {
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [select, setSelect] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const fetchRoles = () => {
    getAllRoles()
      .then((data) => {
        setRolesData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderRoles = () => {
    return rolesData.map((e) => {
      return (
        <MenuItem value={e.id} key={e.id}>
          {e.name}
        </MenuItem>
      );
    });
  };

  const teste = () => {
    // console.log('teste');
  };

  const renderRolesOptions = () => {
    if (rolesData.length > 0 && select) {
      const rolesInfo = rolesData
        .find((e) => e.id == select)
        .permission.map((e) => {
          return e.isActive ? (
            <Grid item xs={4} sx={{ margin: 'auto' }} key={e.name}>
              <SuiTypography variant="p" fontWeight="medium">
                {e.name}:
              </SuiTypography>
              <Grid sx={style.options()}>
                <Grid item className="checkboxDiv">
                  <input
                    type="checkbox"
                    defaultChecked={e.actions.includes('criar')}
                    onClick={() => teste(e.name, 'criar')}
                  />
                  <SuiTypography variant="caption" fontWeight="light">
                    Criar
                  </SuiTypography>
                </Grid>
                <Grid item className="checkboxDiv">
                  <input
                    type="checkbox"
                    defaultChecked={e.actions.includes('editar')}
                    onClick={() => teste(e.name, 'editar')}
                  />
                  <SuiTypography variant="caption" fontWeight="light">
                    Editar
                  </SuiTypography>
                </Grid>
                <Grid item className="checkboxDiv">
                  <input
                    type="checkbox"
                    defaultChecked={e.actions.includes('ver')}
                    onClick={() => teste(e.name, 'ver')}
                  />
                  <SuiTypography variant="caption" fontWeight="light">
                    Ver
                  </SuiTypography>
                </Grid>
                <Grid item className="checkboxDiv">
                  <input
                    type="checkbox"
                    defaultChecked={e.actions.includes('excluir')}
                    onClick={() => teste(e.name, 'excluir')}
                  />
                  <SuiTypography variant="caption" fontWeight="light">
                    Excluir
                  </SuiTypography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <></>
          );
        });
      return select && rolesInfo ? (
        rolesInfo
      ) : (
        <Grid item xs={12}>
          <SuiTypography variant="h6" fontWeight="bold" sx={{ textAlign: 'center' }}>
            Selecione uma Role
          </SuiTypography>
        </Grid>
      );
    } else {
      return (
        <SuiTypography variant="h6" fontWeight="bold" sx={{ textAlign: 'center' }}>
          Selecione uma Role
        </SuiTypography>
      );
    }
  };

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    fetchRoles();
  }, [location]);

  return (
    <DashboardLayout>
      <DashboardNavbar showTitle={true} title={'Roles'} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card sx={style.card()}>
            <Grid item xs={12} sx={style.divTop()}>
              <Grid item xs={5}>
                <SuiTypography variant="h6" fontWeight="medium">
                  Selecione a Role:
                </SuiTypography>
                <Select value={select} onChange={handleSelectChange} sx={style.styleInput()}>
                  <MenuItem value="">Selecione uma opção</MenuItem>
                  {renderRoles()}
                </Select>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 1 }}
              >
                <Button variant="contained" sx={{ color: 'white !important' }}>
                  Editar
                </Button>
              </Grid>
            </Grid>
          </Card>
          <Card sx={style.card()}>
            <Grid item xs={12} sx={style.gridRoles()}>
              {renderRolesOptions()}
            </Grid>
          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Roles;
