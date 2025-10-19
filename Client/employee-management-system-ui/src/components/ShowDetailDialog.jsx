/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import { showUserType } from '../utils/enums';
import DeleteUser from './DeleteUser';
import EditModal from './EditModal';
import ErrorModal from './ErrorModal';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
  width: 450,
  margin: '15px',
  padding: '15px',
  [theme.breakpoints.down('md')]: {
    margin: '5px',
  },
}));

const ShowDetailDialog = (props) => {
  const { user } = useContext(UserContext);
  const [modalData, setModalData] = useState({
    open: false,
    data: {
      fname: '',
      lname: '',
      email: '',
      age: 0,
      position: '',
      department: '',
      salary: '',
      phone: '',
      address: '',
      type: '',
    },
  });

  const resetModal = () => {
    props.resetModal();
    setModalData(() => (
      {
        open: false,
        data: {
          fname: '',
          lname: '',
          email: '',
          age: 0,
          position: '',
          department: '',
          phone: '',
          address: '',
          type: '',
        }
      }
    ));
  };

  const [error, setError] = useState({
    title: '',
    message: '',
    show: false,
  });

  const resetError = () => {
    setError(() => ({
      title: '',
      message: '',
      show: false,
    }));
  };

  const [deleteUser, setDeleteUser] = useState({
    show: false,
    user: null,
  });

  const setDeleteUserProps = (user) => {
    setDeleteUser(() => ({
      user,
      show: true,
    }));
  }

  const resetDeleteUserProps = () => {
    setDeleteUser(() => ({
      show: false,
      user: null,
    }));
  };

  const setChanges = () => {
    resetShowEditModal();
    resetModal();
    props.setChanges();
  }

  const [showEditModal, setShowEditModal] = useState(false);

  const resetShowEditModal = () => {
    setShowEditModal(() => false);
  };

  useEffect(() => {
    if (props.open) {
      setModalData(() => ({
        open: props.open,
        data: props.data,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open, user]);

  // eslint-disable-next-line react/prop-types
  const RenderOptions = ({ user, show }) => {
    if (!show ) {
      return null;
    }
    else {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => { setShowEditModal(() => (true)) }}>Edit</Button>
          <Button onClick={() => { setDeleteUserProps(user) }}>Delete</Button>
        </Box>
      )
    }
  };

  return (
    <>
      <ErrorModal 
        show={error.show} 
        title={error.title} 
        message={error.message} 
        resetModal={resetError}
      />
      <DeleteUser
        user={ deleteUser.user }
        show={ deleteUser.show }
        resetModal={resetDeleteUserProps}
        setChanges={setChanges}
      />
      <EditModal 
        open={showEditModal}
        setError={setError}
        id={props.data._id}
        firstName={modalData.data.fname}
        lastName={modalData.data.lname}
        phone={modalData.data.phone}
        age={modalData.data.age}
        email={modalData.data.email}
        address={modalData.data.address}
        position={modalData.data.position}
        department={modalData.data.department}
        salary={modalData.data.salary}
        type={modalData.data.type}
        setChanges={setChanges}
        resetShowEditModal={resetShowEditModal}
      />
      <Dialog
        open={modalData.open}
        onClose={resetModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <StyledCard>
            <Box>
              <DialogTitle id="modal-modal-title" variant='h4' component='h2'>
                {`${modalData.data.fname} ${modalData.data.lname}${modalData.data.type ?`(${modalData.data.type})` :''}`}
              </DialogTitle>
              <Divider>Details</Divider>
            </Box>
            <DialogContent id="modal-description" sx={{ mx: 2 }}>
              <Typography variant='h6' component='h2'>
                Name: {`${modalData.data.fname} ${modalData.data.lname}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Email: {`${modalData.data.email}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Age: {`${modalData.data.age}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Department: {`${modalData.data.department}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Position: {`${modalData.data.position}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Salary: {`${modalData.data.salary}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Phone No.: {`${modalData.data.phone}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Address: {`${modalData.data.address}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                User Type: {`${showUserType[modalData.data.type]}`}
              </Typography>
            </DialogContent>
            <RenderOptions 
              user={modalData.data} 
              show={ ((Object.keys(user).length === 0)? false: true) } 
            />
            <DialogActions>
              <Button onClick={() => {
                resetModal();
              }} autoFocus>
                Close
              </Button>
            </DialogActions>
          </StyledCard>
        </Box>
      </Dialog>
    </>
  );
};

export default ShowDetailDialog;