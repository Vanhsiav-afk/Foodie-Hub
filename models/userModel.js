const db = require('../db'); // Import the database connection
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId; 
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Database query failed');
  }
};


const validatePassword = async (inputPassword, storedHashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
  } catch (error) {
    console.error('Error validating password:', error);
    throw new Error('Password validation failed');
  }
};

module.exports = {
  getUserByUsername,
  addUser,
  validatePassword
};
