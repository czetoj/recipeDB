const express = require('express');
const recipeRouter = express.Router();
const recipeController = require('./recipe.controller');

recipeRouter.get('/recipes', recipeController.getRecipes)
recipeRouter.post('/recipes', recipeController.postRecipe)
recipeRouter.post('/recipes/upload', recipeController.upload)
recipeRouter.patch('/recipes/:id', recipeController.patchRecipe)
recipeRouter.delete('/recipes/:id', recipeController.deleteRecipe)


module.exports = recipeRouter;