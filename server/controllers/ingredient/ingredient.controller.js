const createError = require('http-errors')
const Ingredient = require('../../models/ingredient.model')
const ingredientService = require('./ingredient.service')

exports.getIngredients = async (req, res) => {
    let ingredients = await ingredientService.getAll()
    res.json(ingredients)
};

exports.postIngredient = async (req, res, next) => {
    const { name, unit, calory } = req.body;
    if (!name || !unit || !calory) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newIngredient = {
        name: name,
        unit: unit,
        calory: calory,
    };

    ingredientService.create(newIngredient)
        .then(data => {
            res.status(201);
            res.json(data);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.patchIngredient = async (req, res, next) => {

    const ingredientid = req.params.id

    const { name, unit, calory } = req.body;

    ingredientService.update(ingredientid, name, unit, calory)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.deleteIngredient = async (req, res, next) => {
    const ingredientid = req.params.id

    try {
        await ingredientService.delete(ingredientid)
    } catch (err) {
        return next(new createError.NotFound("Ingredient is not found"));
    }

    res.json(true)
}