import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box } from '@mui/system';
import Table from 'components/Tables/TableCashout';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';
import { Modal } from '@mui/material';

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

const style = (_theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: 'auto',
  backgroundColor: '#F8F8FF',
  boxShadow: 24,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  rowGap: '50px',
  outline: 'none',
});

function ModalComponent({ open, handleClose, rows, columns }) {
  return (
    <Modal open={open} onClose={handleClose} sx={{ border: 'none' }}>
      <Box sx={style}>
        <SuiTypography
          fontWeight="bold"
          sx={{
            paddingTop: 3.5,
            paddingLeft: 3,
            fontSize: '32px',
          }}
        >
          SUCESSO
        </SuiTypography>
        <SuiTypography
          fontWeight="bold"
          sx={{
            paddingTop: 3.5,
            paddingLeft: 3,
            fontSize: '22px',
          }}
        >

          Os seguntes dados foram enviados!
        </SuiTypography>
        <Table handleClose={handleClose} columns={columns} rows={rows} success />
        <SuiButton
          sx={{
            marginBottom: 3.5,
          }}
          onClick={() => {
            handleClose();
          }}
          color="info"
        >
          Fechar
        </SuiButton>
      </Box>
    </Modal>
  );
}

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export default React.memo(ModalComponent);
