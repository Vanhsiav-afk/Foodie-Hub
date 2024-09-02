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
  useTheme,
  useMediaQuery
} from '@mui/material';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const RecipeList = () => {
  const { recipes, loading, error, hasMore } = useInfiniteScroll('/recipes');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading && recipes.length === 0) {
    return <CircularProgress sx={{ color: theme.palette.primary.main, display: 'block', mx: 'auto', mt: 4 }} />;
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
            width: isMobile ? '100%' : { xs: '100%', sm: '48%', md: '30%' },
            mb: 4,
            '&:hover': {
              transform: 'scale(1.03)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: `0px 12px 24px ${theme.palette.grey[700]}`,
            },
            position: 'relative'
          }}
        >
          <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ 
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: `0px 6px 12px ${theme.palette.grey[600]}`,
              bgcolor: '#333', 
              transition: 'box-shadow 0.3s ease',
              ':hover': {
                boxShadow: `0px 12px 24px ${theme.palette.grey[700]}`,
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image || 'default-recipe.jpg'}
                alt={recipe.name}
                sx={{ 
                  objectFit: 'cover', 
                  borderBottom: `4px solid ${theme.palette.primary.main}`
                }}
              />
              <CardContent sx={{ bgcolor: '#222', color: 'white', p: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="white">
                  {recipe.description || 'No description available'}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  p: 1,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  borderRadius: '0 0 0 8px',
                  fontSize: '0.8rem',
                }}
              >
                {recipe.category || 'General'}
              </Box>
            </Card>
          </Link>
        </Box>
      ))}
      {loading && <CircularProgress sx={{ color: theme.palette.primary.main, display: 'block', mx: 'auto', mt: 4 }} />}
      {!hasMore && <Typography variant="body2" color="white" align="center" sx={{ mt: 2 }}>No more recipes to load</Typography>}
    </Box>
  );
};

export default RecipeList;
