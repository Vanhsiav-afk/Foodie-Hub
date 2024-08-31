const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middlewares/uploadMiddleware');


router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', upload.single('image'), recipeController.createRecipe);
router.put('/:id', upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
