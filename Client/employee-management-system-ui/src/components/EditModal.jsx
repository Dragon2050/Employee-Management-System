/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { editUser } from '../services/userService';
import { showUserType, userType } from '../utils/enums';

const EditModal = (props) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ address, setAddress] = useState('');
  const [ age, setAge] = useState(0);
  const [ position, setPosition] = useState('');
  const [ department, setDepartment] = useState('');
  const [ salary, setSalary] = useState(0);
  const [type, setType] = useState(userType.USER);

  useEffect(() => {
    if (props.open) {
      setOpen(() => (props.open));
      setFirstName(() => (props.firstName));
      setLastName(() => (props.lastName));
      setEmail(() => (props.email));
      setAge(() => (props.age));
      setPhone(() => (props.phone));
      setAddress(() => (props.address));
      setPosition(() => (props.position));
      setDepartment(() => (props.department));
      setSalary(() => (props.salary));
      setType(() => (props.type));
    }
  }, [props.open]);

  const handleSubmit = async () => {
    const userData = {
      fname: firstName,
      lname: lastName,
      email,
      phone,
      address,
      position,
      department,
      salary,
      age,
      type,
    }
    const logger = await editUser(props.id, userData);
    if (logger.isError) {
      props.setError(() => ({
        show: true,
        message: logger.errorMessage,
        title: logger.errorTitle,
      }));
    } else {
      doneEdit();
    }
  };

  const resetModal = () => {
    setFirstName(() => (''));
    setLastName(() => (''));
    setEmail(() => (''));
    setAge(() => (0));
    setPhone(() => (''));
    setDepartment(() => (''));
    setAddress(() => (''));
    setPosition(() => (''));
    setSalary(() => (0));
    setType(() => (''));
  };

  const handleClose = () => {
    resetModal();
    props.resetShowEditModal();
    setOpen(false);
  };

  const doneEdit = () => {
    props.setChanges();
    resetModal();
    setOpen(() => (false));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={
          {
            bgcolor: 'backgroundColor.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }
        }>
          <Card sx={{ px: 3}}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <DialogTitle id='alert-dialog-title' variant='h4' component='h2'>
                Edit User
              </DialogTitle>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoComplete='firstName'
                      defaultValue={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete='lastName'
                      defaultValue={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <TextField
                      name="age"
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      defaultValue={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone No."
                      name="phone"
                      defaultValue={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="department"
                      label="Department"
                      name="department"
                      autoComplete="department"
                      defaultValue={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="position"
                      label="Position"
                      name="position"
                      autoComplete="position"
                      defaultValue={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="salary"
                      label="Salary"
                      name="salary"
                      autoComplete="salary"
                      defaultValue={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      defaultValue={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="user Type"
                        onChange={(e) => (setType(e.target.value))}
                      >
                        <MenuItem value={userType.USER}>{showUserType[userType.USER]}</MenuItem>
                        <MenuItem value={userType.ADMIN}>{showUserType[userType.ADMIN]}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid>
                  <Button sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>Edit</Button>
                  <Button sx={{ mt: 3, mb: 2 }} onClick={handleClose}>Cancel</Button>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Box>
    </Dialog>
  );
};

export default EditModal;