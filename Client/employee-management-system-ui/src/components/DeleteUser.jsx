/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';
import { deleteUser} from '../services/userService';


const DeleteUser = (props) => {
  const [deleteModal, setDeleteModal] = useState({
    data: {
      title: '',
      message: '',
    },
    show: false,
  });

  const [error, setError] = useState({
    show: false,
    message: '',
    title: '',
  });

  const resetErrorModal = () => {
    setError(() => ({
      show: false,
      message: '',
      title: '',
    }));
  };

  useEffect(() => {
    if (props.show) {
      setDeleteModal(() => (
        {
          data: {
            title: `Delete user ${props.user.fname}`,
            message: `Do you want to delete ${props.user.fname} ${props.user.lname}?`,
          },
          show: true,
        }
      ));
    }
  }, [props.show]);

  const resetDeleteModal = () => {
    props.setChanges();
    setDeleteModal(() => (
      {
        data: {
          title: '',
          message: '',
        },
        show: false,
      }
    ));
  };

  const deleteRow = async () => {
    const logger = await deleteUser(props.user._id);
    if (logger.isError) {
      setError(() => ({
        show: true,
        title: logger.errorTitle,
        message: logger.errorMessage,
      }));
    } else {
      resetDeleteModal();
    }
  };

  return (
    <>
      <ErrorModal
        title={error.title}
        message={error.message}
        show={error.show}
        resetModal={resetErrorModal}
      />
      <ConfirmationModal
        title={deleteModal.data.title}
        message={deleteModal.data.message}
        okButton={'Delete'}
        cancelButton={'Cancel'}
        show={deleteModal.show}
        okFunction={deleteRow}
        resetModal={props.resetModal}
      />
    </>
  );
};

export default DeleteUser;