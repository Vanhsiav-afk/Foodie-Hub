const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware');
const recipeController = require('../controllers/recipeController');
const upload = require('../middleware/uploadMiddleware');

router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', authenticateUser, upload.single('image'), recipeController.createRecipe);
router.put('/:id', authenticateUser, recipeController.updateRecipe);
router.delete('/:id', authenticateUser, recipeController.deleteRecipe);

module.exports = router;
