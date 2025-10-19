import { createTheme } from '@mui/material/styles';

const primary = {
  main: '#2196f3',
};

const secondary = {
  main: '#9c27b0',
};

const error = {
  main: '#d32f2f',
};

const warning = {
  main: '#ed6c02',
};

const success = {
  main: '#2e7d32',
};
const info = {
  main: '#0288d1',
};

const white = {
  main: '#ffffff',
};

const backgroundColor = {
  main: '#d7ccc8',
};

const theme = createTheme({
  palette: {
    primary,
    secondary,
    info, 
    white,
    success,
    error,
    warning,
    backgroundColor,
  },
});

export default theme;
