import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { approveCashIn, reverseCashIn, reproveCashIn } from 'services/cashin.service'

function ActionsMenu({ id, makeRequest, status }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = () => {
    approveCashIn(id).then((data) => {
      makeRequest(true);
    })
    setAnchorEl(null);
  };

  const handleReprove = () => {
    reproveCashIn(id).then((data) => {
      makeRequest(true);
    })
    setAnchorEl(null);
  };

  const handleReverse = () => {
    reverseCashIn(id).then((data) => {
      makeRequest(true);
    })
    setAnchorEl(null);
  };

  const menuItens = () => {
    if (status == "P") {
      return [
        (<MenuItem onClick={handleApprove} key="Aprovar">Aprovar</MenuItem>),
        (<MenuItem onClick={handleReprove} key="Reprova">Reprova</MenuItem>)
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
