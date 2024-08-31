const db = require('../db'); // Import the database connection

const getUserByUsername = async (username) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; 
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw new Error('Database query failed');
  }
};

const addUser = async (user) => {
  const { username, password } = user;
  try {
    const [result] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    return result.insertId; 
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Database query failed');
  }
};

// Remove validatePassword since we are no longer hashing passwords
// Just return true or false for the sake of consistency in future changes
const validatePassword = (inputPassword, storedHashedPassword) => {
  // As passwords are stored in plain text, directly compare them
  return inputPassword === storedHashedPassword;
};

module.exports = {
  getUserByUsername,
  addUser,
  validatePassword
};
