import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    if (image) formData.append('image', image);

    try {
      await axios.post('/recipes', formData, { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } 
      });
      setSuccess('Recipe created successfully');
      setName('');
      setIngredients('');
      setSteps('');
      setImage(null);
    } catch (err) {
      setError('Failed to create recipe');
    }
  };

  return (
    <Container 
      sx={{ 
        bgcolor: '#000000', // Black background
        color: '#FFFFFF', // White text color
        p: 3 
      }}
    >
      <Typography variant="h4" gutterBottom>Create Recipe</Typography>
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
            color: '#FFFFFF',
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
          Create
        </Button>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
    </Container>
  );
};

export default CreateRecipe;
