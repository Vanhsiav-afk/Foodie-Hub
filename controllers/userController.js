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

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
