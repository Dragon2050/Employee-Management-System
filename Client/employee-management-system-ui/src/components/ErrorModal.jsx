/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

const ErrorModal = (props) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    message: '',
    title: '',
  });

  const handleClickOpen = () => {
    setInfo(() => ({
      title: props.title,
      message: props.message,
      method: null,
    }));
    setOpen(true);
  };

  const handleClose = () => {
    props.resetModal();
    setOpen(false);
  };

  useEffect(() => {
    if (props.show) {
      handleClickOpen();
    }
  }, [props.show])

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ border: '1px solid red' }}
      >
        <DialogTitle id="alert-dialog-title">
          {info.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if(!info.method) {
              handleClose();
            } else {
              props.method();
            }
          }} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ErrorModal;