const db = require('../db'); 


const getAllRecipes = async () => {
  const [rows] = await db.query('SELECT * FROM recipes');
  return rows;
};


const getRecipeById = async (id) => {
  const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
  return rows[0];
};


const addRecipe = async (recipe) => {
  const { name, description, ingredients, steps } = recipe;
  const [result] = await db.query(
    'INSERT INTO recipes (name, description, ingredients, steps) VALUES (?, ?, ?, ?)',
    [name, description, ingredients, steps]
  );
  return result.insertId;
};


const updateRecipe = async (id, recipe) => {
  const { name, description, ingredients, steps } = recipe;
  await db.query(
    'UPDATE recipes SET name = ?, description = ?, ingredients = ?, steps = ? WHERE id = ?',
    [name, description, ingredients, steps, id]
  );
};


const deleteRecipe = async (id) => {
  await db.query('DELETE FROM recipes WHERE id = ?', [id]);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
