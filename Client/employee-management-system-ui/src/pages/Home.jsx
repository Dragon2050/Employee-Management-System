import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardComponent from '../components/CardComponent';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
  margin: '15px',
  [theme.breakpoints.down('md')]: {
    margin: '5px',
  },
}));

const Home = () => {
  return (
    <>
      <StyledCard>
        <Typography variant='h3' gutterBottom >
          Dashboard
        </Typography>
        <Box>
          <CardComponent breakpoint={5} spacing={2} margin={2} />
        </Box>
      </StyledCard>
    </>
  );
};

export default Home;