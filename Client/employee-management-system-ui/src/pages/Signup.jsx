import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import ErrorModal from '../components/ErrorModal';
import { signUp } from '../services/authServices';
import themes from '../themes/themes';

// TODO remove, this demo shouldn't need to reset the theme.

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checker, setChecker] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: '',
  });

  const resetModal = () => {
    setError(() => ({
      show: false,
      message: '',
      title: '',
    }));
  };

  const handleSubmit = async () => {
    const userData = {
      fname: firstName,
      lname: lastName,
      email,
      password,
      checker,
      type: 'user',
    }
    const logger = await signUp(userData);
    if (logger.isError) {
      setError(() => ({
        show: true,
        message: logger.errorMessage,
        title: logger.errorTitle,
      }));
    } else {
      navigate('/signin');
    }
  };

  return (
    <>
      <ThemeProvider theme={themes}>
        <ErrorModal title={error.title} message={error.message} show={error.show} resetModal={resetModal}/>
        <Box sx={
          {
            height: '100vh',
            width: '100vw',
            bgcolor: 'backgroundColor.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }
        }>
          <Container component="main" maxWidth="xs">
            <Card sx={{ px: 3}}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
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
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                          endAdornment: 
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((show) => !show)}
                                onMouseDown={(event) => {
                                  event.preventDefault();
                                }}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox onChange={(e) => setChecker(e.target.checked)} color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                      <Button onClick={()=>navigate('/signin')}>
                        Already have an account? Sign in
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Card>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SignUp;