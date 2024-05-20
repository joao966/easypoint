import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { updateLancamento } from 'services/open.service'

function ActionsMenu({ id, _makeRequest, status, navigate, rest }) {
  const { status: retiraStatus, ...subRest } = rest;
  console.log("id:", id)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = () => {
    // approveCashIn(id).then((data) => {
    //   makeRequest(true);
    // })
    // setAnchorEl(null);
  };

  const handleClosed = () => {
    updateLancamento({id, status: 'closed', ...subRest});
    navigate(`/closed`);
  };

  const handleReverse = () => {
    // reverseCashIn(id).then((data) => {
    //   makeRequest(true);
    // })
    // setAnchorEl(null);
  };

  const menuItens = () => {
    if (status == "open") {
      return [
        (<MenuItem onClick={handleApprove} key="Aprovar">Editar</MenuItem>),
        (<MenuItem onClick={handleClosed} key="Reprova">Fechar</MenuItem>)
      ]
    } else if (status == "A") {
      return [
        <MenuItem onClick={handleReverse} key="Estornar">Estornar</MenuItem>
      ]
    } else {
      return [
        <p key={id}>
          Sem ação disponivel
        </p>
      ]
    }
  }

  return (
    <div>
      <Button title="Ações" sx={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClick}>
        <MoreVertIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItens()}
      </Menu>
    </div >
  );
}

export default ActionsMenu
