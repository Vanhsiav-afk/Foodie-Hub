import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: 'red' }} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#121212', color: 'white', p: 4, borderRadius: '12px' }}>
      {recipe && (
        <Box>
          <Typography variant="h4" gutterBottom align="center" color={theme.palette.primary.main}>
            {recipe.title}
          </Typography>
          <Card sx={{ mb: 4, borderRadius: '12px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="300"
              image={recipe.image || 'default-recipe.jpg'}
              alt={recipe.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ bgcolor: '#1c1c1c', color: 'white' }}>
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
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default RecipeDetail;
