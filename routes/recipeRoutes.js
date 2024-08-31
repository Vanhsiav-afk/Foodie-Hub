const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middlewares/uploadMiddleware');
const authenticateUser = require('../middlewares/authMiddleware');

router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', authenticateUser, upload.single('image'), recipeController.createRecipe);
router.put('/:id', authenticateUser, upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', authenticateUser, recipeController.deleteRecipe);

module.exports = router;
