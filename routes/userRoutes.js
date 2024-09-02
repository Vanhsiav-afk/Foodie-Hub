const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController'); // Import recipeController

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

router.get('/:userId/profile', userController.getUserProfile);
router.get('/:userId/recipes', recipeController.getRecipesByUser);

router.get('/:userId/preferences', userController.getUserPreferences);
router.post('/:userId/preferences', userController.saveUserPreferences);

module.exports = router;
