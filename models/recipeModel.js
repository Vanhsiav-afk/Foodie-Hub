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
  const { name, ingredients, steps, image } = recipe;
  try {
    const [result] = await db.query(
      'INSERT INTO recipes (name, ingredients, steps, image) VALUES (?, ?, ?, ?)',
      [name, ingredients, steps, image]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw new Error('Database query failed');
  }
};


const updateRecipe = async (id, recipe) => {
  const { name, ingredients, steps, image } = recipe;
  await db.query(
    'UPDATE recipes SET name = ?, ingredients = ?, steps = ?, image = ? WHERE id = ?',
    [name, ingredients, steps, image, id]
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
