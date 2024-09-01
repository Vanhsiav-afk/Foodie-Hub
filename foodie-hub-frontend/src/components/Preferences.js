
import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('preferences'));
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, []);

  const handleChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSavePreferences = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    alert('Preferences saved!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Preferences
      </Typography>
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
    </Container>
  );
};

export default Preferences;
