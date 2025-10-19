/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const StyledTable = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
  margin: '15px',
  [theme.breakpoints.down('md')]: {
    margin: '5px',
  },
  width: '50%',
}));

const columns = [
  {
    field: 'sl',
    headerName: 'Serial No.',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    valueGetter: (params) => `${params.row.fname || ''} ${params.row.lname || ''}`,
  },
  {
    field: 'createdAt',
    headerName: 'Joining Date',
    width: 200,
    valueGetter: (params) => `${DateTime.fromISO(params.row.createdAt).toLocaleString(DateTime.DATE_FULL)}`,
  }
];

const LatestEmployee = (props) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const users = props.rows ?? [];
    users.forEach((user, idx) => {
      user.sl = idx + 1;
    });
    setRows(() => users);
  }, [props.rows]);

  return (
    <>
      <StyledTable>
        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{
              bgcolor: '#68a8fc',
              height: '50px',
              color: 'white.main',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            variant='h6'
          >
            Latest recruted employees
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            getRowId={(row) => row._id}
          />
        </Box>
      </StyledTable>
    </>
  );
}

export default LatestEmployee;