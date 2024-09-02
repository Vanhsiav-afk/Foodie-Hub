import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, Alert } from '@mui/material';
import axios from 'axios';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`/users/${userId}/preferences`);
        
        if (response.data) {
          setPreferences(response.data);
        } 
      } catch (err) {
        if (err.response && err.response.status !== 404) {
          setError('Error fetching preferences');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userId]);

  const handleChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSavePreferences = async () => {
    try {
      await axios.post(`/users/${userId}/preferences`, preferences);
      setSuccess('Preferences saved successfully!');
      setError(null);
    } catch (err) {
      setError('Error saving preferences');
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Preferences
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">Dietary Restrictions</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.vegan}
                  onChange={handleChange}
                  name="vegan"
                />
              }
              label="Vegan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.vegetarian}
                  onChange={handleChange}
                  name="vegetarian"
                />
              }
              label="Vegetarian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.glutenFree}
                  onChange={handleChange}
                  name="glutenFree"
                />
              }
              label="Gluten-Free"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.dairyFree}
                  onChange={handleChange}
                  name="dairyFree"
                />
              }
              label="Dairy-Free"
            />
          </FormGroup>
          <Button
            onClick={handleSavePreferences}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Preferences
          </Button>
        </FormControl>
      )}
    </Container>
  );
};

export default Preferences;
