/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

const ConfirmationModal = (props) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    message: '',
    title: '',
    okButton: 'Ok',
    cancelButton: 'Close',
    okFunction: null,
  });
  
  useEffect(() => {
    if (props.show) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [props.show]);

  const handleOpen = () => {
    setInfo(() => ({
      title: props.title,
      message: props.message,
      okButton: props.okButton,
      okFunction: props.okFunction ?? handleClose,
      cancelButton: props.cancelButton,
    }));
    setOpen(true);
  };

  const handleClose = () => {
    props.resetModal();
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {info.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info.messsage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{info.cancelButton ?? 'Close'}</Button>
          <Button onClick={info.okFunction} autoFocus>
            {info.okButton ?? 'Ok'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;