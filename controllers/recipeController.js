const Recipe = require('../models/recipeModel');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
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
    const recipeId = await Recipe.addRecipe(req.body);
    res.status(201).json({ id: recipeId });
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).send('Server Error');
  }
};

const updateRecipe = async (req, res) => {
  try {
    await Recipe.updateRecipe(req.params.id, req.body);
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
