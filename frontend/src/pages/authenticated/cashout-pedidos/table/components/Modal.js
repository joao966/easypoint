import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import CashOutForm from 'pages/authenticated/cashout-pedidos/form';

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .MuiBox-root {
    margin: 0px;
    padding-top: 0px;
  }
`;

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
  outline: 'none',
});

function TransitionsModal({
  open,
  handleOpen,
  handleClose,
  setRows,
  rows,
  id,
  setId,
  edit,
  setEdit,
  setDatasetUpload,
  setDataErros,
  setOpenError,
  setDisabled,
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} sx={{ border: 'none' }}>
        <Box sx={style}>
          <CashOutForm
            id={id}
            rows={rows}
            handleOpen={handleOpen}
            handleClose={handleClose}
            setRows={setRows}
            setId={setId}
            edit={edit}
            setEdit={setEdit}
            setDatasetUpload={setDatasetUpload}
            setDataErros={setDataErros}
            setOpenError={setOpenError}
            setDisabled={setDisabled}
          />
        </Box>
      </Modal>
    </div>
  );
}

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export default React.memo(TransitionsModal);
