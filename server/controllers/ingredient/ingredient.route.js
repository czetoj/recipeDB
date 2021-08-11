const express = require('express');
const ingredientRouter = express.Router();
const ingredientController = require('./ingredient.controller');

ingredientRouter.get('/ingredients', ingredientController.getIngredients)
ingredientRouter.post('/ingredients', ingredientController.postIngredient)
ingredientRouter.patch('/ingredients/:id', ingredientController.patchIngredient)
ingredientRouter.delete('/ingredients/:id', ingredientController.deleteIngredient)


module.exports = ingredientRouter;