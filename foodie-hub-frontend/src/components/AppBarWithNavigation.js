import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const AppBarWithNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = token ? [
    { text: 'My Profile', icon: <PersonIcon fontSize="large" />, onClick: () => navigate(`/profile/${userId}`) },
    { text: 'Preferences', icon: <SettingsIcon fontSize="large" />, onClick: () => navigate('/preferences') },
    { text: 'Create Recipe', icon: <AddCircleIcon fontSize="large" />, onClick: () => navigate('/recipes/create') },
    { text: 'Logout', icon: <LogoutIcon fontSize="large" />, onClick: handleLogout },
  ] : [
    { text: 'Login', icon: <PersonIcon fontSize="large" />, onClick: () => navigate('/login') },
    { text: 'Register', icon: <PersonIcon fontSize="large" />, onClick: () => navigate('/register') },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
          boxShadow: '0px 8px 16px rgba(0,0,0,0.8)',
          borderBottom: '2px solid rgba(255,0,0,0.7)',
          px: 3,
          py: 1
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'red',
              textDecoration: 'none',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              '&:hover': {
                color: 'white',
                textDecoration: 'underline'
              },
            }}
          >
            FoodieHub
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ fontSize: '2rem' }}
          >
            <MenuIcon sx={{ color: 'red' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { bgcolor: '#000', color: 'white', width: isMobile ? '100%' : 250 }
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick} sx={{ py: 2 }}>
              {item.icon && <ListItemIcon sx={{ color: 'red', minWidth: '40px' }}>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} sx={{ color: 'red', fontWeight: 'medium' }} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: 'rgba(255,0,0,0.7)', my: 1 }} />
      </Drawer>
    </>
  );
};

export default AppBarWithNavigation;
