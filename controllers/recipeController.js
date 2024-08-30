const Recipe = require('../models/recipeModel');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.render('recipes', { recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server Error');
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    if (recipe) {
      res.render('recipe', { recipe });
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
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : null; 

    const recipeId = await Recipe.addRecipe({
      title,
      ingredients,
      instructions,
      image
    });

    res.status(201).json({ id: recipeId, title, ingredients, instructions, image });
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).send('Server Error');
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : null;

    await Recipe.updateRecipe(req.params.id, { title, ingredients, instructions, image });

    res.status(200).send('Recipe updated successfully');
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).send('Server Error');
  }
};


const deleteRecipe = async (req, res) => {
  try {
    await Recipe.deleteRecipe(req.params.id);
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
