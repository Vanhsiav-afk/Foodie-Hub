const db = require('../db'); 

const getRecipesWithPagination = async (limit, offset) => {
  return await db.query('SELECT * FROM recipes LIMIT ? OFFSET ?', [limit, offset]);
};

const getAllRecipes = async () => {
  const [rows] = await db.query('SELECT * FROM recipes');
  return rows;
};


const getRecipeById = async (id) => {
  const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
  return rows[0];
};


const addRecipe = async (recipe) => {
  const { title, ingredients, instructions, image } = recipe;
  const [result] = await db.query(
    'INSERT INTO recipes (title, ingredients, instructions, image) VALUES (?, ?, ?, ?)',
    [title, ingredients, instructions, image]
  );
  return result.insertId;
};


const updateRecipe = async (id, recipe) => {
  const { title, ingredients, instructions, image } = recipe;
  await db.query(
    'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?',
    [title, ingredients, instructions, image, id]
  );
};


const deleteRecipe = async (id) => {
  await db.query('DELETE FROM recipes WHERE id = ?', [id]);
};

module.exports = {
  getRecipesWithPagination,
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
