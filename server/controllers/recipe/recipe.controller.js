const createError = require('http-errors')
const Recipe = require('../../models/recipe.model')
const recipeService = require('./recipe.service')

exports.getRecipes = async (req, res) => {
    try {
        let recipes = await recipeService.getAll()
        res.json(recipes)
    } catch (err) {
        return next(new createError.NotFound("Recipes is not found"));
    }
};

exports.postRecipe = (req, res, next) => {
    const { name, category, time_need, difficulty, price_friendly, time_pre, time_cooking, degree, index, calory, description, ingredients, ingredients_quantity, ingredients_unit, img, story, portion } = req.body;
    // if (!lastName || !firstName || !vaccine) {
    //     return next(
    //         new createError.BadRequest("Missing properties!")
    //     );
    // }

    const newRecipe = new Recipe({
        name: name,
        category: category,
        time_need: time_need,
        difficulty: difficulty,
        price_friendly: price_friendly,
        time_pre: time_pre,
        time_cooking: time_cooking,
        degree: degree,
        index: index,
        calory: calory,
        description: description,
        ingredients: ingredients,
        ingredients_quantity: ingredients_quantity,
        ingredients_unit: ingredients_unit,
        img: img,
        story: story,
        portion: portion
    });

    recipeService.create(newRecipe)
        .then(data => {
            res.status(201);
            res.json(data);
        });
}

exports.patchRecipe = (req, res, next) => {

    const recipeid = req.params.id

    const { name, category, time_need, difficulty, price_friendly, time_pre, time_cooking, degree, index, calory, description, ingredients, ingredients_quantity, ingredients_unit, img, story, portion } = req.body;

    recipeService.update(recipeid, name, category, time_need, difficulty, price_friendly, time_pre, time_cooking, degree, index, calory, description, ingredients, ingredients_quantity, ingredients_unit, img, story, portion)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.deleteRecipe = async (req, res, next) => {
    const recipeid = req.params.id

    try {
        await recipeService.delete(recipeid);
    } catch (err) {
        return next(new createError.NotFound("Vaccine is not found"));
    }

    res.json(true)
}