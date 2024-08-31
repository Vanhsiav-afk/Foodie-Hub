import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('/users/register', { username, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
    }
  };

  return (
    <Container 
      sx={{ 
        bgcolor: '#000000', // Black background
        color: '#FFFFFF', // White text color
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        mt: 5
      }}
    >
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#FFFFFF' } }} // White text for input fields
        InputLabelProps={{ style: { color: '#FFFFFF' } }} // White label text
        sx={{ bgcolor: '#333333', borderRadius: 1 }} // Dark background for inputs
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: '#FFFFFF' } }} // White text for input fields
        InputLabelProps={{ style: { color: '#FFFFFF' } }} // White label text
        sx={{ bgcolor: '#333333', borderRadius: 1 }} // Dark background for inputs
      />
      <Button 
        onClick={handleRegister} 
        variant="contained" 
        color="primary"
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Container>
  );
};

export default Register;
