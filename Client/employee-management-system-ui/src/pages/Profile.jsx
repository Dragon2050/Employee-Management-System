import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';
import { showUserType } from '../utils/enums';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.secondary.main,
}));

const Profile = () => {
  const [dates] = useState([
    '5-1-2023',
    '9-3-2023',
    '11-6-2023',
    '14-8-2023',
  ]);

  const { user } = useContext(UserContext);

  return (
    <>
      <Box sx={
        {
          bgcolor: 'backgroundColor.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          m: 3
        }
      }>
        <Grid container justifyContent='space-between' spacing={2}>
          <Grid item xs={3}>
            <Item>
              <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Avatar
                  src="/src/assets/images/logo_ems2.jpeg"
                  variant='rounded'
                  sx={{ width: '300px', height: '300px', m: 3}}
                />
              </Box>
              <Box sx={{ 
                m: 3,
                border: '1px solid lightblue',
                p: 1,
              }}>
                <Typography
                  sx={{ color: '#43d8e8', mb: 3 }}
                  variant='h4'
                >
                  Leave Taken
                </Typography>
                {dates.map((date, idx) => (
                  <Typography sx={{ color: '#43d8e8' }} key={idx}>
                    { idx + 1 }: {date}
                  </Typography>
                ))}
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Box sx={{ m: 3, color: 'black' }}>
                <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant='h3' sx={{ color: 'black'}}>
                    Hello, {user.fname} {user.lname}
                  </Typography>
                  <IconButton sx={{ bgcolor: '#5cb6f2', width: '55px'}}>
                    <ModeEditIcon />
                  </IconButton>
                </Box>
                <Typography variant='body1'>
                  {user.position}
                </Typography>
              </Box>
              <Divider sx={{ m:3 }}>Profile</Divider>
              <Box sx={{m:3, color: 'black', border: '1px solid pink'}}>
                <Typography variant='h5' sx={{ m:2 }}>
                  Name: {`${user.fname} ${user.lname}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Email: {`${user.email}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Age: {`${user.age}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Department: {`${user.department}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Position: {`${user.position}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Salary: {`${user.salary}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Phone No.: {`${user.phone}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Address: {`${user.address}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  User Type: {`${showUserType[user.type]}`}
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>  
              <Box sx={{ 
                m: 3,
                border: '1px solid #e649db',
                p: 1,
              }}>
                <Box sx={{ m: 2}}>
                  <Typography
                    sx={{ color: '#e60bd7', mb: 3 }}
                    variant='h4'
                  >
                    Necessary docs
                  </Typography>
                </Box>
                <Divider sx={{ m: 2, bgcolor: '#e649db'}}/>
                <Box sx={{ m: 2}}>
                  <Typography>
                    <Link to='/home' >Institutional Calender 2023</Link>
                  </Typography>
                  <Typography>
                    <Link to='/home' >Rulebook</Link>
                  </Typography>
                  <Typography>
                    <Link to='/home' >Application form to prior salary </Link>
                  </Typography>
                  <Typography>
                    <Link to='/home' >Application for loan</Link>
                  </Typography>
                </Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;