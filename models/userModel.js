const db = require('../db'); 
const getUserById = async (userId) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Database query failed');
  }
};
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


const validatePassword = (inputPassword, storedHashedPassword) => {
  
  return inputPassword === storedHashedPassword;
};

module.exports = {
  getUserById,
  getUserByUsername,
  addUser,
  validatePassword
};
