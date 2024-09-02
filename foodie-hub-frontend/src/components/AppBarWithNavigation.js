import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBarWithNavigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
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
      { text: 'My Profile', onClick: () => navigate(`/profile/${userId}`) },
      { text: 'Preferences', onClick: () => navigate('/preferences') },
      { text: 'Create Recipe', onClick: () => navigate('/recipes/create') },
      { text: 'Logout', onClick: handleLogout },
    ] : [
      { text: 'Login', onClick: () => navigate('/login') },
      { text: 'Register', onClick: () => navigate('/register') },
    ];
  
    return (
      <>
        <AppBar
          position="sticky"
          color="transparent"
          sx={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.7)',
            borderBottom: '1px solid rgba(255,0,0,0.5)',
            px: 2
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                color: 'red',
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  color: 'white'
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
            sx: { bgcolor: '#000', color: 'white' }
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={item.onClick}>
                <ListItemText primary={item.text} sx={{ color: 'red' }} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: 'rgba(255,0,0,0.5)' }} />
        </Drawer>
      </>
    );
  };

  export default AppBarWithNavigation;