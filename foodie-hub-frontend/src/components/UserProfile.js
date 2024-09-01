import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  console.log(useParams());
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const [userResponse, recipesResponse] = await Promise.all([
          axios.get(`/users/${userId}/profile`), 
          axios.get(`/users/${userId}/recipes`),
        ]);

        setUser(userResponse.data);
        setRecipes(recipesResponse.data);
      } catch (err) {
        // Handle error properly
        setError(err.response?.data?.error || 'An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      {user ? (
        <>
          <Typography variant="h4" gutterBottom>
            {user.username}'s Profile
          </Typography>
          <Typography variant="h6">User ID: {user.id}</Typography>
          <Typography variant="h6" gutterBottom>
            Email: {user.email}
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Recipes Uploaded by {user.username}
          </Typography>
          <Grid container spacing={2}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <div>
                    <img
                      src={`/${recipe.image || 'default-recipe.jpg'}`}
                      alt={recipe.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <Typography variant="h6">{recipe.name}</Typography>
                    <Typography variant="body2">{recipe.description}</Typography>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No recipes found.</Typography>
            )}
          </Grid>
        </>
      ) : (
        <Typography variant="body1">User profile not found.</Typography>
      )}
    </Container>
  );
};

export default UserProfile;
