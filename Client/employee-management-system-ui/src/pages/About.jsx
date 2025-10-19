import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, styled } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import theme from '../themes/themes';

// TODO remove, this demo shouldn't need to reset the theme.

const About = () => {
  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
    margin: '15px',
    [theme.breakpoints.down('md')]: {
      margin: '5px',
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <StyledCard>
      <Typography variant='h3'>About</Typography>
      <Box sx={
        {
          height: '84vh',
					width: '100vw',
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
              <Typography variant='h4'>
                Tanvir Ahmed
              </Typography>
              <Typography>
                Embedded Software Engineer
              </Typography>
              <Typography>
                Relisource Technologies Ltd
              </Typography>
              <Typography>
                Mobile: +880abcdefghij
              </Typography>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Card>
        </Container>
      </Box>
      </StyledCard>
    </ThemeProvider>
  );
}

export default About;