import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const RecipeList = () => {
  const { recipes, loading, error, hasMore } = useInfiniteScroll('/recipes');
  const theme = useTheme();

  if (loading && recipes.length === 0) {
    return <CircularProgress sx={{ color: theme.palette.primary.main, display: 'block', mx: 'auto' }} />;
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>;
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        p: 2,
        gap: 2,
        maxWidth: '100%',
      }}
    >
      {recipes.map((recipe) => (
        <Box 
          key={recipe.id} 
          sx={{ 
            width: { xs: '100%', sm: '48%', md: '30%' },
            mb: 4,
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: `0px 8px 16px ${theme.palette.grey[800]}`,
            },
          }}
        >
          <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: `0px 4px 8px ${theme.palette.grey[700]}`,
              bgcolor: '#333', 
              transition: 'box-shadow 0.3s ease'
            }}>
              <CardMedia
                component="img"
                height="250"
                image={recipe.image || 'default-recipe.jpg'}
                alt={recipe.name}
              />
              <CardContent sx={{ bgcolor: '#222', color: 'white' }}>
                <Typography variant="h6" component="div">
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="white">
                  {recipe.description || 'No description available'}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Box>
      ))}
      {loading && <CircularProgress sx={{ color: theme.palette.primary.main, display: 'block', mx: 'auto' }} />}
      {!hasMore && <Typography variant="body2" color="white" align="center">No more recipes to load</Typography>}
    </Box>
  );
};

export default RecipeList;
