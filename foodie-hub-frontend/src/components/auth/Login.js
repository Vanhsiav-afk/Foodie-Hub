import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
    }
  };

  return (
    <Container 
      sx={{ 
        bgcolor: '#000000', 
        color: '#FFFFFF', 
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        mt: 5
      }}
    >
      <Typography variant="h4" gutterBottom>Login</Typography>
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
        onClick={handleLogin} 
        variant="contained" 
        color="primary"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
