/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DateTime } from "luxon";
import ErrorModal from '../components/ErrorModal';
import ShowDetailDialog from '../components/ShowDetailDialog';
import UserTable from '../components/UserTable';
import LatestEmployee from '../components/LatestEmployee';
import { UserContext } from '../contexts/Contexts';
import { getUsers, getLatestEmployee } from '../services/userService';

const Employee = () => {
  const [columns, setColumns] = useState([
    { field: 'sl', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      valueGetter: (params) =>
        `${params.row.fname || ''} ${params.row.lname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 250,
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 250,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Joining Date',
      width: 250,
      valueGetter: (params) => `${DateTime.fromISO(params.row.createdAt).toLocaleString(DateTime.DATE_FULL)}`,
    },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [rows, setRows] = useState([]);
  const [latestEmployeeRows, setLatestEmployeeRows] = useState([]);
  const [changes, setChanges] = useState(false);
  const { user } = useContext(UserContext);
  const [error, setError] = useState({
    title: '',
    message: '',
    show: false,
  });

  const resetChanges = () => {
    setChanges(() => (!changes));
  }

  const resetError = () => {
    setError(() => ({
      title: '',
      message: '',
      show: false,
    }));
  };

  const [modalData, setModalData] = useState({
    open: false,
    data: {
      fname: '',
      lname: '',
      email: '',
      age: 0,
      position: '',
      phone: '',
      address: '',
    },
  });

  const resetModal = () => {
    setModalData(() => (
      {
        open: false,
        data: {
          fname: '',
          lname: '',
          email: '',
          age: 0,
          position: '',
          phone: '',
          address: '',
        }
      }
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      const latestEmployees = await getLatestEmployee();
      if (users.isError) {
        setError(() => ({
          title: users.errorTitle,
          message: users.errorMessage,
          show: true,
        }));
      } else {
        users.forEach((item, index) => {item.sl = index + 1});
        setRows(() => (users));
        if (Object.keys(user).length > 0 && user.type === 'admin' && !(columns.some((item) => item.field === 'detail'))) {
          setColumns((initColumns) => [...initColumns, {
            field: 'detail',
            headerName: 'Detail',
            width: 160,
            renderCell: (params) => (
              <Button onClick={(e) => {
                e.stopPropagation();
                setModalData(() => ({
                  open: true,
                  data: params.row,
                }));
              }}>Click to see Details</Button>
            ),
          }]);
        }
        setLatestEmployeeRows(() => latestEmployees);
      }
    }
    fetchData();
  },[changes, user]);

  return (
    <>
      <ErrorModal 
        show={error.show} 
        title={error.title} 
        message={error.message} 
        resetModal={resetError}
      />
      <ShowDetailDialog 
        data={modalData.data}
        open={modalData.open}
        resetModal={resetModal}
        setChanges={resetChanges}
      />
      <UserTable rows={rows} columns={columns} />
      <LatestEmployee rows={latestEmployeeRows} />
    </>
  );
};

export default Employee;