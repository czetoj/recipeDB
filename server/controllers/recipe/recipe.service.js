const Recipe = require('../../models/recipe.model')

exports.getAll = () => Recipe.find()

exports.create = (newRecipe) => Recipe.insertMany(newRecipe)

exports.update = (recipeid, name, category, time_need, difficulty, price_friendly, time_pre, time_cooking, degree, index, calory, description, ingredients, ingredients_quantity, ingredients_unit, img, story, portion) => Recipe.updateOne({ _id: recipeid }, {
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
})

exports.delete = (recipeid) => Recipe.findByIdAndDelete({ _id: recipeid })