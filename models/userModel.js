const db = require('../db'); // Import the database connection
const bcrypt = require('bcrypt');

const getUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const addUser = async (user) => {
  const { username, password } = user;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds); 

  const [result] = await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );
  return result.insertId;
};


const validatePassword = async (inputPassword, storedHashedPassword) => {
  return await bcrypt.compare(inputPassword, storedHashedPassword);
};

module.exports = {
  getUserByUsername,
  addUser,
  validatePassword
};
