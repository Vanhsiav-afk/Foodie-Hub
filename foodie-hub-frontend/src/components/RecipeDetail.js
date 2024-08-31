import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
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
        maxWidth: '100%',
      }}
    >
      {recipe && (
        <>
          <Typography variant="h4" gutterBottom>
            {recipe.name}
          </Typography>
          <img
            src={`/${recipe.image || 'default-recipe.jpg'}`} // Corrected image path format
            alt={recipe.name}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <Typography variant="body1" paragraph>
            {recipe.ingredients}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" paragraph>
            {recipe.steps}
          </Typography>
          <Button 
            onClick={handleUpdate} 
            variant="contained" 
            color="primary"
            sx={{ mr: 2, backgroundColor: '#FF5722', '&:hover': { backgroundColor: '#E64A19' } }}
          >
            Update Recipe
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="contained" 
            color="error"
            sx={{ backgroundColor: '#F44336', '&:hover': { backgroundColor: '#D32F2F' } }}
          >
            Delete Recipe
          </Button>
        </>
      )}
    </Container>
  );
};

export default RecipeDetail;
