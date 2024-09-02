const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    
    const userId = await User.addUser({ username, password });
    req.session.user = { id: userId, username };
    res.status(201).json({ id: userId, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Server Error');
  }
};


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = User.validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }


    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username },
      token 
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Server Error');
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Server Error');
    }
    res.redirect('/'); 
  });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
};
const getUserPreferences = async (req, res) => {
  try {
    const userId = req.params.userId;
    const preferences = await User.getUserPreferences(userId);
    
    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found for this user.' });
    }

    res.json(preferences);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).json({ error: 'An error occurred while fetching preferences.' });
  }
};

const saveUserPreferences = async (req, res) => {
  try {
    const userId = req.params.userId;
    const preferences = req.body;

    await User.saveUserPreferences(userId, preferences);

    res.status(200).json({ message: 'Preferences saved successfully' });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ error: 'An error occurred while saving preferences.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getUserPreferences,
  saveUserPreferences
};
