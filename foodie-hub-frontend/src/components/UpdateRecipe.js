import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`);
        setRecipe(response.data);
        setName(response.data.name);
        setIngredients(response.data.ingredients);
        setSteps(response.data.steps);
      } catch (err) {
        setError('Failed to fetch recipe details');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    if (image) formData.append('image', image);
    
    try {
      await axios.put(`/recipes/${id}`, formData, { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } 
      });
      setSuccess('Recipe updated successfully');
      navigate(`/recipes/${id}`);
    } catch (err) {
      setError('Failed to update recipe');
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <Container 
      sx={{ 
        bgcolor: '#000000', 
        color: '#FFFFFF', 
        p: 3 
      }}
    >
      <Typography variant="h4" gutterBottom>Update Recipe</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{ style: { color: '#FFFFFF' } }} // White text for input fields
          InputLabelProps={{ style: { color: '#FFFFFF' } }} // White label text
          sx={{ backgroundColor: '#333333', borderRadius: 1 }} // Dark background for inputs
        />
        <TextField
          label="Ingredients"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          InputProps={{ style: { color: '#FFFFFF' } }} // White text for input fields
          InputLabelProps={{ style: { color: '#FFFFFF' } }} // White label text
          sx={{ backgroundColor: '#333333', borderRadius: 1 }} // Dark background for inputs
        />
        <TextField
          label="Steps"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          InputProps={{ style: { color: '#FFFFFF' } }} // White text for input fields
          InputLabelProps={{ style: { color: '#FFFFFF' } }} // White label text
          sx={{ backgroundColor: '#333333', borderRadius: 1 }} // Dark background for inputs
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ 
            margin: '16px 0', 
            color: '#FFFFFF', // Adjust file input color
            backgroundColor: '#333333', // Dark background for file input
            border: '1px solid #FFFFFF',
            borderRadius: '4px',
            padding: '8px'
          }} 
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ mt: 2 }}
        >
          Update
        </Button>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
    </Container>
  );
};

export default UpdateRecipe;
