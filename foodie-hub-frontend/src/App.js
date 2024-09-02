import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import AppBarWithNavigation from './components/AppBarWithNavigation';
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
            p: 2,
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


export default App;
