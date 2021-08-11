const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: String,
    unit: String,
    calory: Number,
}, {
    timestamps: true
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);


module.exports = Ingredient;