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


const addRecipe = async (recipe, userId) => {
  const { name, ingredients, steps, image } = recipe;
  try {
    const [result] = await db.query(
      'INSERT INTO recipes (name, ingredients, steps, image, user_id) VALUES (?, ?, ?, ?, ?)',
      [name, ingredients, steps, image, userId]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw new Error('Database query failed');
  }
};


const updateRecipe = async (id, recipe, userId) => {
  const { name, ingredients, steps, image } = recipe;
  await db.query(
    'UPDATE recipes SET name = ?, ingredients = ?, steps = ?, image = ? WHERE id = ? AND user_id = ?',
    [name, ingredients, steps, image, id, userId]
  );
};


const deleteRecipe = async (id, userId) => {
  await db.query('DELETE FROM recipes WHERE id = ? AND user_id = ?', [id, userId]);
};

module.exports = {
  getRecipesWithPagination,
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
