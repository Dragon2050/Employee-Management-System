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
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import ErrorModal from '../components/ErrorModal';
import { UserContext } from '../contexts/Contexts';
import { signIn } from '../services/authServices';
import theme from '../themes/themes';

// TODO remove, this demo shouldn't need to reset the theme.

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
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
      email,
      password,
      remember,
    };
    const logger = await signIn(userData);
    if (logger.isError) {
      setError(() => ({
        show: true,
        title: logger.errorTitle,
        message: logger.errorMessage,
      }));
    } else {
      setUser(() => (logger.user));
      navigate('/home');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <CssBaseline />
          <Card sx={{ px: 3 }}>
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
              <Typography variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
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
                <FormControlLabel
                  control={<Checkbox onChange={(event) => setRemember(event.target.checked)} color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs={12}>
                    <Button onClick={(()=>{/* navigate('/forgetpassword') */})}>
                      Forgot password?
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={()=>navigate('/signup')}>
                      {"Don't have an account? Sign Up"}
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
  );
}

export default SignIn;