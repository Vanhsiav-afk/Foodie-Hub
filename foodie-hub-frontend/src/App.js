import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, CssBaseline, Box, Button } from '@mui/material';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeCreate from './components/CreateRecipe';
import RecipeEdit from './components/UpdateRecipe';

const App = () => {
  return (
    <Router>
      <CssBaseline />
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
          {/* Link to the home page */}
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'red', textDecoration: 'none' }}>
            FoodieHub
          </Typography>
          {/* Button to create a new recipe */}
          <Button component={Link} to="/recipes/create" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
            Create Recipe
          </Button>
        </Toolbar>
      </AppBar>

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
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
