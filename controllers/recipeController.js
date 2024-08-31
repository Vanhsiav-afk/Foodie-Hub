const Recipe = require('../models/recipeModel');

const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [recipes] = await Recipe.getRecipesWithPagination(limit, offset);
    const totalRecipes = await Recipe.getAllRecipes();

    res.json({
      recipes,
      total: totalRecipes,
      page,
      totalPages: Math.ceil(totalRecipes / limit)
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server Error');
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).send('Server Error');
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, steps } = req.body;
    const image = req.file ? req.file.path : null;
    const userId = req.user.id; // Get userId from authenticated user

    if (!name || !ingredients || !steps) {
      return res.status(400).send('Missing required fields');
    }

    const recipeId = await Recipe.addRecipe({ name, ingredients, steps, image }, userId);
    res.status(201).json({ id: recipeId, name, ingredients, steps, image });
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).send('Server Error');
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, steps } = req.body;
    const image = req.file ? req.file.path : null;
    const userId = req.user.id;

    await Recipe.updateRecipe(req.params.id, { name, ingredients, steps, image }, userId);

    res.status(200).send('Recipe updated successfully');
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).send('Server Error');
  }
};


const deleteRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    await Recipe.deleteRecipe(req.params.id, userId);
    res.status(200).send('Recipe deleted successfully');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
