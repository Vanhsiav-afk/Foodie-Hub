const User = require('../models/userModel');


const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    
    const userId = await User.addUser({ username, password });
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

    
    const isPasswordValid = await User.validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  registerUser,
  loginUser
};
