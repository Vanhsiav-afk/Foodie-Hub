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

const getUserPreferences = async (userId) => {
  try {
    const [rows] = await db.query('SELECT * FROM user_preferences WHERE user_id = ?', [userId]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw new Error('Database query failed');
  }
};

const saveUserPreferences = async (userId, preferences) => {
  const { vegan, vegetarian, glutenFree, dairyFree } = preferences;
  try {
    await db.query(
      `INSERT INTO user_preferences (user_id, vegan, vegetarian, gluten_free, dairy_free)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE vegan = VALUES(vegan), vegetarian = VALUES(vegetarian), gluten_free = VALUES(gluten_free), dairy_free = VALUES(dairy_free)`,
      [userId, vegan, vegetarian, glutenFree, dairyFree]
    );
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw new Error('Database query failed');
  }
};
module.exports = {
  getUserById,
  getUserByUsername,
  addUser,
  validatePassword,
  getUserPreferences,
  saveUserPreferences
};
