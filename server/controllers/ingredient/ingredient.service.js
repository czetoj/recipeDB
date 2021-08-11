const Ingredient = require('../../models/ingredient.model')

exports.getAll = () => Ingredient.find()

exports.create = (newIngredient) => Ingredient.insertMany(newIngredient)

exports.update = (ingredientid, name, unit, calory) => Ingredient.updateOne({ _id: ingredientid }, {
    name: name,
    unit: unit,
    calory: calory,
})

exports.delete = (ingredientid) => Ingredient.findByIdAndDelete({ _id: ingredientid })