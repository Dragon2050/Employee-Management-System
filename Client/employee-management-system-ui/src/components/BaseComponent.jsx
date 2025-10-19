import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MUIToggleButton from '@mui/material/ToggleButton';
import MUIToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';
import { clearTokens } from '../services/authServices';

const drawerWidth = 240;
const navItems = ['Home', 'Employees', 'Profile', 'About'];

const ToggleButtonGroup = styled(MUIToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.25),
    borderColor: 'secondary',
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const ToggleButton = styled(MUIToggleButton)(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#80d8ff'
  },
  '&:not(.Mui-selected)': {
    backgroundColor: '#ffffff'
  }
}));

function BaseComponent(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alignment, setAlignment] = useState('en-us');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    clearTokens();
    setUser(() => ({}));
    navigate('/signin');
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%' }}>
      <Box component='div' sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ my: 2 }}>
            EMS
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton 
                  sx={{ textAlign:'center' }}
                  onClick={()=>navigate(`/${item.toLowerCase()}`)}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Divider />
          <Button onClick={logout} variant='contained' sx={{ px: 3, py: 1, m: 3}}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{display: 'flex'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Avatar
              sx={{mx: 1, cursor: 'pointer'}}
              src="/src/assets/images/logo_ems3.jpeg"
              alt="Logo"
              onClick={ () => {navigate('/home')} }
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'block' }}
          >
            Employee Management System
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="Platform"
            sx = {{
              border: '2px solid white',
            }}
          >
            <ToggleButton value="en-us">En</ToggleButton>
            <ToggleButton value="bn">Bn</ToggleButton>
          </ToggleButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: 'block',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

BaseComponent.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BaseComponent;