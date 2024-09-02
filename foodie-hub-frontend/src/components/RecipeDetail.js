import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Button, Box, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch logged-in user ID from local storage
    const fetchUserId = () => {
      const id = localStorage.getItem('userId');
      setUserId(id);
    };
    
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/recipes/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to delete recipe');
    }
  };

  const handleUpdate = () => {
    navigate(`/recipes/edit/${id}`);
  };

  if (loading) {
    return <CircularProgress sx={{ color: 'red', display: 'block', mx: 'auto', mt: 5 }} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container 
      sx={{ 
        bgcolor: '#000000', // Black background
        color: '#FFFFFF', // White text color
        p: 3,
        maxWidth: 'lg',
      }}
    >
      {recipe && (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'flex-start',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <Card sx={{ bgcolor: '#333', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0,0,0,0.6)', flex: 1 }}>
            <CardMedia
              component="img"
              height="300"
              image={`/${recipe.image || 'default-recipe.jpg'}`} // Corrected image path format
              alt={recipe.name}
              sx={{ objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
            />
            <CardContent sx={{ bgcolor: '#222', color: 'white', p: 3 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                {recipe.name}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Ingredients
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                {recipe.ingredients}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                {recipe.steps}
              </Typography>
              {userId === recipe.ownerId && ( // Check if logged-in user is the owner
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button 
                    onClick={handleUpdate} 
                    variant="contained" 
                    color="primary"
                    sx={{ backgroundColor: '#FF5722', '&:hover': { backgroundColor: '#E64A19' }, textTransform: 'capitalize' }}
                  >
                    Update Recipe
                  </Button>
                  <Button 
                    onClick={handleDelete} 
                    variant="contained" 
                    color="error"
                    sx={{ backgroundColor: '#F44336', '&:hover': { backgroundColor: '#D32F2F' }, textTransform: 'capitalize' }}
                  >
                    Delete Recipe
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default RecipeDetail;
