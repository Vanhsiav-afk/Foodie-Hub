import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, CssBaseline, Box, Button } from '@mui/material';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeCreate from './components/CreateRecipe';
import RecipeEdit from './components/UpdateRecipe';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Preferences from './components/Preferences';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBarWithNavigation />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          bgcolor: '#000000', // Black background
          color: '#FFFFFF', // White text color
        }}
      >
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            p: 0, 
            m: 0,
            maxWidth: '100%',
            overflowY: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/recipes/create" element={<RecipeCreate />} />
            <Route path="/recipes/edit/:id" element={<RecipeEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

const AppBarWithNavigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      sx={{ 
        background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.7)',
        borderBottom: '1px solid rgba(255,0,0,0.5)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'red', textDecoration: 'none' }}>
          FoodieHub
        </Typography>
        <Button component={Link} to="/preferences" variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }}>
          Preferences
        </Button>
        {token ? (
          <>
            <Button component={Link} to={`/profile/${userId}`} variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }}>
              My Profile
            </Button>
            <Button component={Link} to="/recipes/create" variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }}>
              Create Recipe
            </Button>
            <Button onClick={handleLogout} variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }}>
              Login
            </Button>
            <Button component={Link} to="/register" variant="outlined" sx={{ color: 'white', borderColor: 'white', mx: 1 }}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default App;
